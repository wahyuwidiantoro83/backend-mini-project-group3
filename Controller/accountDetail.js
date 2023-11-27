const { auth, accountDetails } = require("../models");
const bcrypt = require("bcrypt");
const transporter = require("../Helper/mailer");
const jwt = require("jsonwebtoken");

module.exports = {
  completeProfile: async (req, res, next) => {
    console.log("A", req.body);
    try {
      console.log("Body Permintaan", req.userData);
      console.log("Nilai req.userData:", req.userData);

      const userData = await auth.findOne({
        where: { email: req.userData.email },
      });

      console.log("Data Pengguna", userData);

      // Memeriksa pengguna terlebih dahulu
      if (!userData) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      if (userData.role !== "USER" && userData.role !== "PROMOTOR") {
        return res.status(400).send({
          success: false,
          message: "Invalid user role",
        });
      }

      const accountDetailData = {
        name: req.body.name,
        phone: req.body.phone,
        birthDate: req.body.birth_date,
        // reff_code: req.body.reff_code,
        authId: userData.id, // Hubungan antara tabel auth dan account_detail melalui authId
        pointId: req.body.pointId,
      };

      if (userData.role === "USER") {
        accountDetailData.birthDate = req.body.birth_date;

        // Membuat referral code dengan (username + random number)
        const randomNum = Math.floor(1000 + Math.random() * 900);
        console.log("ini angka referral nya", randomNum);
        const referralCode = req.userData.username + randomNum;
        console.log("gabungan dengan username", referralCode);
        accountDetailData.reff_code = referralCode;
        console.log(accountDetailData.reff_code);

        accountDetailData.pointId = req.body.pointId;
        // } else if (userData.role === "EVENT ORGANIZER") {
        //   if (req.files && req.files.length > 0) {
        //     const documentPaths = req.files.map((file) => file.path);
        //     accountDetailData.document = documentPaths;
        //     return res.status(200).send({
        //       success: true,
        //       message: "File Upload"
        //     })
        //   } else {
        //     return res.status(400).send({
        //       success: false,
        //       message: "No document files uploaded.",
        //     });
        //   }
        //   accountDetailData.bank_acc = req.body.bank_acc;
      }

      // Simpan data ke dalam tabel account_detail
      const result = await accountDetails.create(accountDetailData);

      const token = jwt.sign(
        {
          id: req.body.id,
        },
        process.env.SCRT_TKN,
        {
          expiresIn: "1h",
        }
      );

      console.log("Verification token:", token);

      await transporter.sendMail({
        from: "Admin",
        to: req.body.email,
        subject: "Account Verification",
        html: `<h1>Hello, ${req.body.name}, please verify your account:</h1>
                <a href="http://localhost:2023/verify?token=${token}"CLICK TO VERIFY</a>`,
      });

      console.log("Verification email sent successfully");

      return res.status(201).send({
        success: true,
        result,
        message: "Verification email sent successfully.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error completing profile",
      });
    }
  },
};
