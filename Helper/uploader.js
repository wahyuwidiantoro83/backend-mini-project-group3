const multer = require("multer");
const fs = require("fs");
module.exports = {
    uploader: (directory) => {
        const defaultDir = "./public"

        const storageUploader = multer.diskStorage({
            destination: (req, file, cb) => {
                const pathDir = directory? defaultDir+directory : defaultDir; 
                if (fs.existsSync(pathDir)) {
                    console.log(`Directory ${pathDir} EXIST`);
                    cb(null, pathDir)
                } else {
                    fs.mkdirSync(pathDir, (err) => {
                        if (err) {
                            console.log("Error Create Directory", err);
                        }
                        return cb(err, pathDir);
                    })
                }
            },
            filename:(req,file,cb)=> {
                cb(null, `${Date.now()}--${file.originalname}`)
            }
        })

        const fileFilter = (req,file,cb)=>{
            if (file.originalname.toLowerCase().includes(".pdf")) {
                cb(null, true)
            } else {
                cb (new Error("Your file extension are denied. Only PDF", false))
            }
        } 

        return multer({storage:storageUploader, fileFilter}) ;
    }
}