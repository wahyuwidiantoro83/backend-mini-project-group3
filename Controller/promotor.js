const db = require("../Helper/mysql");
const { templateRes } = require("../Helper/utilist");
const {account_details, events}=require("../models")
const fs = require("fs")


module.exports = {
    publish:async(req,res,next)=>{
      try {
        
      } catch (error) {
        next(templateRes(500,false,"cant publish event",null,error.message))
      }
    },

    getDataEvent : async(req,res,next)=>{
        try {
          return next(templateRes(200, true,"Success connect in API",null,null ))
        } catch (error) {
          return next(templateRes(500, false,"NOT SUCCESS connect in API",null,null ))
        }
    },

  
    getPromotorEvent : async(req,res,next)=>{
      try {
        const userId = await account_details.findOne({
          where:{
            name:req.token
          },
          raw:true
        })
        
        const eventUser = await events.findAll({
          where:{
            id_promotor:userId.id
          }
        })
        console.log("ini event user", eventUser);

        return next(templateRes(201,true,"get event success",eventUser,null))

      } catch (error) {
        return next(templateRes(500,false,"get event promotor UNSUCCESSFULL",null, error.message))
      }
    },

    editPromotorEvent : (req,res)=>{

    },
    
    deletePromotorEvent : async(req,res,next)=>{
      try {
        const eventDelete = await events.destroy({
          where:{
            id:req.body.id
          }
        })
        await events.update({isDeleted:true},{where:{id:req.body.id}})
        next(templateRes(200,true,"Delete Event Success",eventDelete,null))
      } catch (error) {
        console.log(error);
        next(templateRes(200,true,"Delete Event UnSuccessfull",null,error.message))
      }
    },

    postPromotorEvent : async(req,res,next)=>{
      try {
        // const userId = await account_details.findOne({
        //   where:{
        //     name:req.body.name
        //   }, 
        //   raw:true
        // })

        // if(!userId.role==="promotor"){
        //   next(templateRes(400, false, "You did not authorized to use this feature", null, error.message))
        // } 
        console.log("masuk bro");
        const result = await events.create({
          name:req.body.name,
          id_city:req.body.id_city,
          address:req.body.address,
          type:req.body.type,
          start_date:req.body.start_date,
          end_date:req.body.end_date,
          start_hour:req.body.start_hour,
          end_hour:req.body.end_hour,
          description:req.body.description,
          picture:req.file.filename,
          id_category:req.body.id_category,
          id_promotor:req.body.id_promotor,
        })

        return next(templateRes(200,true,"Success create event", result, null))
      } catch (error) {
        fs.unlinkSync(`${req.file.path}`)
        next(templateRes(500, false, "error create event",null, error.message))
      }
    },

    getPromotorTicket : (req,res)=>{

    },

    postPromotorTicket : (req,res)=>{

    },

    editPromotorTicket : (req,res)=>{

    },

    deletePromotorTicket : (req,res)=>{

    },

    postPromotorTicket : (req,res)=>{

    }
}