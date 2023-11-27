const { auths } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../Helper/mailer");
const { Op } = require("sequelize");

module.exports = {
  register: async (req, res, next) => {
    try {
      console.log("CHECK DATA FROM CLIENT", req.body);

      console.log("Auths Model", auths);
      const isExist = await auths.findOne({
        where: {
          [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
        },
      });
      if (isExist) {
        return res.status(400).send({
          success: false,
          message: "Email or Username already exist",
        });
      }
      delete req.body.confirmPassword;
      const salt = await bcrypt.genSalt(10);
      console.log("salt", salt);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      console.log("hashPassword", hashPassword);
      req.body.password = hashPassword;

      const result = await auths.create(req.body);
      const token = jwt.sign(
        {
          id: req.body.id,
          username: req.body.username,
          email: req.body.email,
          role: req.body.role,
        },
        process.env.SCRT_KEY,
        {
          expiresIn: "7d",
        }
      );
      return res.status(201).send({
        status: true,
        message: "Register Success",
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  verifyAccount: async (req, res, next) => {
    try {
      console.log("sampek sini nih");
      const verifikasi = await auths.findOne({
        where: { email: req.userData.email },
        attributes: { exclude: ["password"] },
        raw: true,
      });
      console.log(verifikasi);

      if (!verifikasi) {
        return res.status(401).send({
          success: false,
          message: "account not register",
        });
      }
      await auths.update(
        {
          isVerified: true,
        },
        {
          where: {
            id: verifikasi.id,
          },
        }
      );

      return res.status(200).send({
        success: true,
        message: "Account verification successful.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error verification account",
      });
    }
  },
  login: async (req, res, next) => {
    console.log("masuk ga ya", req.body);
    try {
      const { email, password } = req.body;
      const result = await auths.findOne({
        where: {
          email: email,
        },
      });
      if (!result) {
        return res.status(400).send({
          success: false,
          message: "Email not found",
        });
      }
      const isPasswordMatch = await bcrypt.compare(password, result.password);
      if (!isPasswordMatch) {
        return res.status(400).send({
          success: false,
          message: "Password not match",
        });
      }
      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
        },
        process.env.SCRT_KEY,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).send({
        success: true,
        message: "Login Success",
        result: {
          username: result.username,
          email: result.email,
          role: result.role,
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  updateAccount: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
      const result = await auths.update(body, {
        where: {
          id: id,
        },
      });
      return res.status(200).send({
        status: true,
        message: "Update Success",
        result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  forgetPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await auths.findOne({
        where: {
          email: email,
        },
      });
      if (!result) {
        return res.status(400).send({
          success: false,
          message: "Email not found",
        });
      }
      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
        },
        process.env.SCRT_KEY,
        {
          expiresIn: "7d",
        }
      );
      await transporter.sendMail({
        from: "Admin",
        to: email,
        subject: "Reset Password",
        html: `<h1>Hello, ${result.username}, please reset your password:</h1>
                    <a href="http://localhost:2023/reset?token=${token}">CLICK TO RESET</a>`,
      });
      return res.status(200).send({
        success: true,
        message: "Reset password email sent successfully.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.query;
      const { password } = req.body;
      if (!token) {
        return res.status(400).send({
          success: false,
          message: "Invalid verification token",
        });
      }

      const result = jwt.verify(token, process.env.SCRT_KEY);

      if (!result) {
        return res.status(401).send({
          success: false,
          message: "Invalid verification token",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await auths.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: result.id,
          },
        }
      );
      return res.status(200).send({
        success: true,
        message: "Reset password successful.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await auths.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).send({
        success: true,
        message: "Delete user success",
        result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
