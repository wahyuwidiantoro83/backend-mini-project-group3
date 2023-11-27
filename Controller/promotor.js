const { error } = require("console");
const db = require("../Helper/mysql");
const { templateRes } = require("../Helper/utilist");
const { account_details, events, auth, categories, cities } = require("../models")
const fs = require("fs")
const jwt = require("jsonwebtoken");

module.exports = {
  dummyLogin: async (req, res, next) => {
    try {
      const result = await auth.findOne({
        where: { email: req.body.email }, raw: true
      })
      if (result) {
        const { id, username, email, role } = result
        const token = jwt.sign({ id, role, username }, process.env.SCRT_TKN)
        return next(templateRes(201, true, "success login", token, null))
      } else {
        next(templateRes(400, false, "Error login", null, error.message))
      }

    } catch (error) {
      return next(templateRes(201, true, "success login", null, null))
    }
  },

  checkRole: async (req, res, next) => {
    try {
      if (req.userData) {
        const result = await account_details.findOne(
          {
          where: {
            id: req.userData.id
          },
          raw: true
        })
        if (result.role === "promotor") {
          next(templateRes(200, true, "You are promotor", result, null))
        } else {
          next(templateRes(400, false, "you dont have auth", null, null))
        }
      }

    } catch (error) {
      next(templateRes(500, false, "you dont have auth", null, error.message))
    }
  },
  publish: async (req, res, next) => {
    try {

    } catch (error) {
      next(templateRes(500, false, "cant publish event", null, error.message))
    }
  },

  getDataEvent: async (req, res, next) => {
    try {
      return next(templateRes(200, true, "Success connect in API", null, null))
    } catch (error) {
      return next(templateRes(500, false, "NOT SUCCESS connect in API", null, null))
    }
  },

  getCategory:async (req, res, next) =>{
    try {
      const getAllCategory = await categories.findAll({raw:true})
      return next(templateRes(201, true, "get category success", getAllCategory, null))
    } catch (error) {
      next(templateRes(500,false,"cannot get category",null,error,message))
    }
  },

  getPromotorEvent: async (req, res, next) => {
    try {
      const getEvent = await events.findAll({
        where: {
          id_promotor: req.userData.id
        },
        include: [
          { // ini untuk join tabel
          model: categories,
          required: true,
          attributes: ["category"] 
        },
        {
          model:cities,
          required: true,
          attributes: ["city"]
        }
      ],
        raw: true
      })
      const arrayEvent = getEvent.map((val, idx) => {
        return {
          idEvent:val.id,
          name: val.event_name,
          category: val["category.category"],
          sold:0,
          date: `${new Date(val.start_date).toLocaleDateString("en",{day:"numeric", day: "numeric", month: "short", year: "numeric"})}`,
          status:"active"
        }
      })
      console.log("ini array event",arrayEvent);
      return next(templateRes(201, true, "get event success", arrayEvent, null))

    } catch (error) {
      return next(templateRes(500, false, "get event promotor UNSUCCESSFULL", null, error.message))
    }
  },

  editPromotorEvent: (req, res) => {

  },

  deletePromotorEvent: async (req, res, next) => {
    try {
      const eventDelete = await events.destroy({
        where: {
          id: req.body.id
        }
      })
      await events.update({ isDeleted: true }, { where: { id: req.body.id } })
      next(templateRes(200, true, "Delete Event Success", eventDelete, null))
    } catch (error) {
      console.log(error);
      next(templateRes(200, true, "Delete Event UnSuccessfull", null, error.message))
    }
  },

  postPromotorEvent: async (req, res, next) => {
    try {
      
      const result = await events.create({
        name: req.body.name,
        id_city: req.body.id_city,
        address: req.body.address,
        type: req.body.type,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        start_hour: req.body.start_hour,
        end_hour: req.body.end_hour,
        description: req.body.description,
        picture: req.file.filename,
        id_category: req.body.id_category,
        id_promotor: req.body.id_promotor,
      })

      return next(templateRes(200, true, "Success create event", result, null))
    } catch (error) {
      fs.unlinkSync(`${req.file.path}`)
      next(templateRes(500, false, "error create event", null, error.message))
    }
  },

  getPromotorTicket: (req, res) => {

  },

  postPromotorTicket: (req, res) => {

  },

  editPromotorTicket: (req, res) => {

  },

  deletePromotorTicket: (req, res) => {

  },

  postPromotorTicket: (req, res) => {

  }
}