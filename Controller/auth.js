const { auth } = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../Helper/mailer");
const { Op } = require("sequelize")


module.exports ={
    register: async (req, res, next) => {
    try {
        console.log("CHECK DATA FROM CLIENT", req.body);

        console.log("Auth Model", auth);
        const isExist = await auth.findOne({
            where: {
                [Op.or]: [{email: req.body.email}, {username: req.body.username}]
            }
        })
        if(isExist) {
            return res.status(400).send({
                success: false,
                message: "Email or Username already exist"
            })
        } 
        delete req.body.confirmPassword
        const salt = await bcrypt.genSalt(10)
        console.log("salt", salt);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        console.log("hashPassword", hashPassword);
        req.body.password = hashPassword

    

        const result = await auth.create(req.body)


        return res.status(201).send({
            status: true,
            message: "Register Success"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
  },

  verifyAccount: async (req, res, next) => {
    try {
        const token = req.query.token;

        if(!token) {
            return res.status(400).send({
                success: false,
                message: "Invalid verification token",
            });
        }

        const result = jwt.verify(token, process.env.SMPN_PASS);

        if(!result) {
            return res.status(401).send({
                 success: false,
                 message: "Invalid verification token"
            })
        }

        await auth.update({
            isVerified: true
        }, {
            where: {
                id: result.id
            }
        });

        return res.status(200).send({
            success: true,
            message: "Account verification successful."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error verification account"
        })
    }
  }, 
  login: async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await auth.findOne({
            where: {
                email: req.body.email
            }
        })
    } catch (error) {
        
    }
  }, 
}