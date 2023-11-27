const db = require("../models");
const {
  auths,
  transactions,
  transactionDetails,
  accountDetails,
  events,
  tickets,
  points,
} = require("../models");
const nodemailer = require("nodemailer");
const { transporter } = require("../Helper/mailer.js");

module.exports = {
  createTransaction: async (req, res) => {
    try {
      const { id } = req.body;
      const { idEvent, idTicket, qty } = req.body;
      const findEvent = await events.findOne({
        where: {
          id: idEvent,
        },
      });
      const findTicket = await tickets.findOne({
        where: {
          id: idTicket,
        },
      });
      const findAccountDetail = await accountDetails.findOne({
        where: {
          idUser: id,
        },
      });
      const findPoint = await points.findOne({
        where: {
          idUser: id,
        },
      });
      const total = findTicket.price * qty;
      const newPoint = findPoint.points - total;
      const newBalance = findAccountDetail.balance + total;
      const newQty = findTicket.qty - qty;
      const updatePoint = await points.update(
        {
          point: newPoint,
        },
        {
          where: {
            idUser: id,
          },
        }
      );
      const updateBalance = await accountDetails.update(
        {
          balance: newBalance,
        },
        {
          where: {
            idUser: id,
          },
        }
      );
      const updateQty = await tickets.update(
        {
          qty: newQty,
        },
        {
          where: {
            id: idTicket,
          },
        }
      );
      const createTransaction = await transactions.create({
        idUser: id,
        idEvent: idEvent,
        idTicket: idTicket,
        qty: qty,
        total: total,
      });

      await transporter.sendMail({
        from: "Admin",
        to: "nivar10673@mainoj.com",
        subject: "Transaction Confirmation",
        html: `<h1>Hello, ${req.body.name}, Your transaction has been confirmed. </h1>`,
      });
      console.log("Your transaction has been confirmed.");

      return res.status(200).send({
        status: true,
        message: "Transaction Success",
        data: createTransaction,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  getAllTransaction: async (req, res) => {
    try {
      const { id } = req.user;
      const findTransaction = await transactions.findAll({
        where: {
          idUser: id,
        },
        include: [
          {
            model: db.event,
            as: "event",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: db.ticket,
            as: "ticket",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      return res.status(200).send({
        status: true,
        message: "Get All Transactions Success",
        data: findTransaction,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  getTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const findTransaction = await transactions.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: db.event,
            as: "event",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: db.ticket,
            as: "ticket",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      return res.status(200).send({
        status: true,
        message: "Get Transaction Success",
        data: findTransaction,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  updateTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const findTransaction = await transactions.findOne({
        where: {
          id: id,
        },
      });
      const updateTransaction = await transactions.update(body, {
        where: {
          id: id,
        },
      });
      return res.status(200).send({
        status: true,
        message: "Update Transaction Success",
        data: updateTransaction,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const findTransaction = await transactions.findOne({
        where: {
          id: id,
        },
      });
      const deleteTransaction = await transactions.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).send({
        status: true,
        message: "Delete Transaction Success",
        data: deleteTransaction,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
