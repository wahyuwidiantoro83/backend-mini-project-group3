const jwt=require("jsonwebtoken")
const { templateRes } = require("../Helper/utilist")

module.exports = {
    validateTokenPromotor : (req,res,next)=>{
        try {
            if(!req.token){
                return next(templateRes(400,false,"You dont have account",null,null))
            } else {
                const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
                if(!verifyData){
                    return next(templateRes(401,false,"Unauthorized Request"))
                }
                req.userData = verifyData
                console.log("masuk ke VP", userData);
                next()
            }
        } catch (error) {
            return next(templateRes(400,false,"Invalid Token"))
        }
        
    },

    validateRolePromotor : (req,res,next)=>{
        try {
            const verifyData = jwt.verify(req.token, process.env.SCRT_TKN)
            if(verifyData.role==="promotor"){
                req.userData = verifyData
                next()
            }
            return next(templateRes(400,false,"Unauthorized Role",null,null))
        } catch (error) {
            return next(templateRes(500,false,"Unauthorized to feature",null,null))
            
        }
    }
}