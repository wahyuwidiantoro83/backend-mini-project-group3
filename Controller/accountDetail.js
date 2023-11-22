const { auth, account_detail } = require("../models");
const bcrypt = require("bcrypt");
const transporter = require("../Helper/mailer")



module.exports = {
    completeProfile: async (req, res, next) => {
        try {
            console.log("Body Permintaan", req.body);
            console.log("Nilai req.body.email:", req.body.email);

            const userData = await auth.findAll({
                where: { email: req.body.email},

            });

            console.log("Data Pengguna", userData);

            // Memeriksa pengguna terlebih dahulu     
            if (!userData) {
                return res.status(404).send({
                    success: false,
                    message: "User not found",
                });
            }

            if (userData.role !== "USER" && userData.role !== "EVENT ORGANIZER") {
                return res.status(400).send({
                    success: false,
                    message: "Invalid user role",
                });
            }

            
            const accountDetailData = {
                countryCode: req.body.countryCode,
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                birth_date: req.body.birth_date,
                reff_code: req.body.reff_code,
                authId: userData.id, // Hubungan antara tabel auth dan account_detail melalui authId
                pointId: req.body.pointId
            };

           
            if (userData.role === "USER") {
                accountDetailData.birth_date = req.body.birth_date;

                // Membuat referral code dengan (username + random number)
                const randomNum = Math.floor(1000 + Math.random() * 9000);
                const referralCode = req.body.username + randomNum;
                accountDetailData.reff_code = referralCode;

                accountDetailData.pointId = req.body.pointId;
            } else if (userData.role === "EVENT ORGANIZER") {
                if (req.files && req.files.length > 0) {
                    const documentPaths = req.files.map(file => file.path);
                    accountDetailData.document = documentPaths;
                } else {
                    return res.status(400).send({
                        success: false,
                        message: "No document files uploaded.",
                    });
                }
                accountDetailData.bank_acc = req.body.bank_acc;
            }

            // Simpan data ke dalam tabel account_detail
            const result = await account_detail.create(accountDetailData);

            const token = jwt.sign({
                id: userData.id, 
                email: userData.email
            }, 
            process.env.SMPN_PASS,
            {
                expiresIn: "1h"
            });

            console.log("Verification token:", token);

            await transporter.sendMail({
                from: "Admin",
                to: req.body.email,
                subject: "Account Verification",
                html: `<h1>Hello, ${req.body.name}, please verify your account:</h1>
                <a href="http://localhost:2023/verify?token=${token}"CLICK TO VERIFY</a>`
            })

            console.log("Verification email sent successfully");

            return res.status(201).send({
                success: true,
                result,
                message: "Verification email sent successfully." 
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


