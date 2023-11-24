
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "audrafirmansyah73@gmail.com",
        pass: "ymqemhqfvqtspafe"
    }
})

module.exports = transporter
