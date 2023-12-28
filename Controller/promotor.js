const { error, log } = require("console");
const db = require("../Helper/mysql");
const { templateRes } = require("../Helper/utilist");
const { accountdetails, events, auths, categories, cities, tickets, promos } = require("../models");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
  dummyLogin: async (req, res, next) => {
    try {
      console.log("ashasdbjhads", req.body);
      const result = await auths.findOne({
        where: { email: req.body.email },
        raw: true,
      });
      console.log("ini result", result);
      if (result) {
        console.log("yuygefjhsbfdsb");
        const { id, email, username, role } = result;
        const token = jwt.sign({ id, role, username, email }, process.env.SCRT_KEY);
        return next(templateRes(201, true, "success login", token, null));
      } else {
        next(templateRes(400, false, "Error login", null, error.message));
      }
    } catch (error) {
      console.log(error.message);
      return next(templateRes(201, true, "success login", null, error.message));
    }
  },

  checkRole: async (req, res, next) => {
    try {
      if (req.token) {
        const result = jwt.verify(req.token);
        console.log("ini adalah result", result);
      }
    } catch (error) {
      return next(templateRes(500, true, "You dont have Authorization", null, error.message));
    }
  },

  publish: async (req, res, next) => {
    try {
      // Menemukan id city sebagai foreignkey dalam tabel event
      const getCityId = await cities.findOne({
        where: { city: req.body.event.eventCity },
        raw: true,
      });

      console.log("req getcity id bro", getCityId);
      // console.log("req body bro",req.body);
      // console.log("req userdata bro",req.userData);
      // create event dalam DB
      const createEvent = await events.create({
        name: req.body.event.eventTitle,
        idCity: getCityId.id,
        type: req.body.event.eventType,
        address: req.body.event.eventAddress,
        startDate: req.body.event.eventDateStart,
        endDate: req.body.event.eventDateEnds,
        startHour: req.body.event.eventStartHour,
        endHour: req.body.event.eventEndHour,
        description: req.body.event.eventDesc,
        image: req.body.event.fileName,
        idCategory: req.body.event.eventCategoryId,
        idPromotor: req.userData.id,
      });

      // menemukan id event yang baru dibuat untuk mendapatkan
      const getEventId = await events.findOne({
        where: { name: req.body.event.eventTitle },
        raw: true,
      });

      const ticketArray = req.body.ticket.map((val, idx) => {
        return {
          idEvent: getEventId.id,
          level: val.ticketName,
          price: val.ticketPrice,
          stock: val.ticketStock,
          ticketSalesStart: val.ticketSalesStart,
          ticketSalesEnd: val.ticketSalesEnd,
        };
      });
      // console.log("ticket array", ticketArray);
      const createTicket = await tickets.bulkCreate(ticketArray);
      // console.log("create ticket", createTicket);
      console.log("ini req promo");
      const applyPromoArray = [];
      if (req.body.promo) {
        for (let i = 0; i < req.body.promo.length; i++) {
          for (let j = 0; j < req.body.promo[i].applyTo.length; j++) {
            let getIdTicket = await tickets.findOne({
              where: {
                [Op.and]: [
                  {
                    idEvent: getEventId.id,
                  },
                  {
                    level: req.body.promo[i].applyTo[j],
                  },
                ],
              },
              raw: true,
            });

            applyPromoArray.push({
              idEvent: getEventId.id,
              idTicket: getIdTicket.id,
              promoName: req.body.promo[i].promoName,
              discountAmount: req.body.promo[i].discountAmount,
              userLimit: req.body.promo[i].promoLimit,
              codes: `${getEventId.id}${req.body.promo[i].promoLimit}${getIdTicket.id}`,
              isDeleted: 0,
            });
          }
        }
        // console.log("diluar ni cuy",applyPromoArray);
        const createPromo = await promos.bulkCreate(applyPromoArray);
      }

      next(
        templateRes(
          201,
          true,
          "create event, ticket, promo success",
          [createEvent, createTicket],
          null
        )
      );
    } catch (error) {
      console.log(error);
      next(templateRes(500, false, "cant publish event", null, error.message));
    }
  },

  getDataEvent: async (req, res, next) => {
    // try {
    //   return next(templateRes(200, true, "Success connect in API", null, null))
    // } catch (error) {
    //   return next(templateRes(500, false, "NOT SUCCESS connect in API", null, null))
    // }
  },

  getPromotorEvent: async (req, res, next) => {
    try {
      console.log("get promotor event", req.userData);
      const getEvent = await events.findAll({
        where: {
          idPromotor: req.userData.id,
        },
        include: [
          {
            // ini untuk join tabel
            model: categories,
            required: true,
            attributes: ["category"],
          },
          {
            model: cities,
            required: true,
            attributes: ["city"],
          },
        ],
        raw: true,
      });
      const arrayEvent = getEvent.map((val, idx) => {
        return {
          idEvent: val.id,
          name: val.name,
          category: val["category.category"],
          sold: 0,
          date: `${new Date(val.startDate).toLocaleDateString("en", {
            day: "numeric",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}`,
          status: "active",
        };
      });
      console.log("ini array event", arrayEvent);
      return next(templateRes(201, true, "get event success", arrayEvent, null));
    } catch (error) {
      return next(templateRes(500, false, "get event promotor UNSUCCESSFULL", null, error.message));
    }
  },

  editPromotorEvent: async (req, res, next) => {
    try {
      const updateEvent = await events.update({ where: { id: req.params.id } });
    } catch (error) {}
  },

  deletePromotorEvent: async (req, res, next) => {
    console.log("masuk delete");
    console.log("req params,", req.params);
    try {
      const eventDelete = await events.destroy({
        where: {
          id: req.params.id,
        },
      });
      const ticketDelete = await tickets.destroy({
        where: {
          idEvent: req.params.id,
        },
      });
      const promoDelete = await promos.destroy({
        where: {
          idEvent: req.params.id,
        },
      });

      next(templateRes(200, true, "Delete Event Success", eventDelete, null));
    } catch (error) {
      console.log(error);
      next(templateRes(200, true, "Delete Event UnSuccessfull", null, error.message));
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
      });

      return next(templateRes(200, true, "Success create event", result, null));
    } catch (error) {
      fs.unlinkSync(`${req.file.path}`);
      next(templateRes(500, false, "error create event", null, error.message));
    }
  },

  getPromotorTicket: (req, res) => {},

  postPromotorTicket: (req, res) => {},

  editPromotorTicket: (req, res) => {},

  deletePromotorTicket: (req, res) => {},

  postPromotorTicket: (req, res) => {},
};
