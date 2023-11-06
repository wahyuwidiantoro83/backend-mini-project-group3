const db = require("../Helper/mysql");

module.exports = {
    getDataEvent : (req,res)=>{
        db.query("SELECT * FROM events", (err, result) => {
            if (err) {
              res.status(500).send({
                success: false,
                message: err.message,
              });
            } else {
              res.status(200).send({
                success: true,
                message: "Success get Data",
                result: result,
              });
            }
          });
    },
    getPromotorEvent : (req,res)=>{

    },
    editPromotorEvent : (req,res)=>{

    },
    deletePromotorEvent : (req,res)=>{

    },
    postPromotorEvent : (req,res)=>{

    },
    getPromotorTicket : (req,res)=>{

    },
    editPromotorTicket : (req,res)=>{

    },
    deletePromotorTicket : (req,res)=>{

    },
    postPromotorTicket : (req,res)=>{

    }
}