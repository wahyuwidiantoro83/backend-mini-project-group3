const { Op } = require("sequelize");
const {
  events,
  tickets,
  categories,
  cities,
  auths,
  accountDetails,
  Sequelize,
} = require("../models");
const getEvent = async (req, res, next) => {
  const filterTicket = {
    stock: {
      [Op.gte]: 1,
    },
  };
  const filterDate = {
    startDate: {
      [Op.gte]: new Date(),
    },
  };
  const filterCategory = {};
  const filterType = {};
  if (req.query?.landingType) {
    if (req.query.landingType === "online") {
      filterType.type = "online";
    } else if (req.query.landingType === "today") {
      filterDate.startDate = new Date();
    } else if (req.query.landingType === "week") {
      const currDate = new Date();
      const endDate = new Date();
      if (currDate.getDay() !== 0) {
        endDate.setDate(endDate.getDate() + (7 - currDate.getDay()));
      }
      filterDate.startDate = {
        [Op.between]: [currDate, endDate],
      };
    } else if (req.query.landingType === "month") {
      const currDate = new Date();
      const endDate = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);
      filterDate.startDate = {
        [Op.between]: [currDate, endDate],
      };
    } else if (req.query.landingType === "free") {
      filterTicket.price = 0;
    }
  }
  const perPage = 8;
  const page = req.query?.page || 1;
  const result = await events.findAll({
    include: [
      {
        model: tickets,
        required: true,
        attributes: [[Sequelize.fn("MIN", Sequelize.col("tickets.price")), "start_at"]],
        where: filterTicket,
      },
      {
        model: categories,
        required: true,
        attributes: ["category"],
      },
      {
        model: cities,
        required: true,
        attributes: ["city"],
        where: {
          city: req.query?.city || "",
        },
      },
      {
        model: auths,
        required: true,
        include: [
          {
            model: accountDetails,
            required: true,
          },
        ],
      },
    ],
    group: "events.id",
    where: {
      ...filterType,
      ...filterDate,
    },
    limit: perPage,
    offset: perPage * (page - 1),
    subQuery: false,
  });

  return res.status(200).send(result);
};

module.exports = { getEvent };
