const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "serolom911@ikanid.com",
        pass: "serolom911"
    }
})

module.exports = transporter