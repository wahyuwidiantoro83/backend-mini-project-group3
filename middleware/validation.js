const jwt = require("jsonwebtoken"); 
const { templateRes } = require("../Helper/utilist");

module.exports={
    validateToken: (req, res, next) => {
        console.log("bingung");
        console.log("ini error", req.token);
        try {
            if(!req.token) {
                return res.status(400).send({
                    success: false,
                    message: "You don't have account"
                })
            } else {
                const verifyData = jwt.verify(req.token, process.env.SCRT_KEY);
                if(!verifyData) {
                    return res.status(401).send({
                        success: false,
                        message: "Unauthorized Request"
                })
                }
                req.userData = verifyData
                next()
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send("Invalid Token")
        }
    },
    // validateRole : (req,res,next)=>{
    //     try {
    //         if(!req.userData.role==="promotor") {
    //             return res.status(400).send({
    //                 success: false,
    //                 message: "You don't have authorize to use  this feature"
    //             })
    //         } else {
    //             // req.userData = verifyData
    //             next(templateRes(200,true,"you are promotor",req.userData,null))
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(400).send("Invalid Token")
    //     }
    // }
}
