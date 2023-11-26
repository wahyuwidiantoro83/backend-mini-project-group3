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
const { templateResponse } = require("../Helper/utils");
const getEvent = async (req, res, next) => {
  try {
    const filterCity = [{ city: req.query.city || "Jakarta" }, { city: "online" }];
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
    if (req.query?.category) {
      filterCategory.category = req.query?.category;
    }
    const filterName = {
      name: {
        [Op.substring]: req.query?.search || "",
      },
    };
    const filterType = {};
    if (req.query?.type?.toLowerCase() === "offline") {
      filterCity.pop();
    }
    if (req.query?.landingType) {
      if (req.query.landingType === "online") {
        filterCity.shift();
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
    const data = await events.findAll({
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
          where: filterCategory,
        },
        {
          model: cities,
          required: true,
          attributes: ["city"],
          where: {
            [Op.or]: filterCity,
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
        ...filterName,
        ...filterType,
        ...filterDate,
      },
      limit: perPage,
      offset: perPage * (page - 1),
      subQuery: false,
    });
    const amount = await events.count({
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
          where: filterCategory,
        },
        {
          model: cities,
          required: true,
          attributes: ["city"],
          where: {
            [Op.or]: filterCity,
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
        ...filterName,
        ...filterType,
        ...filterDate,
      },
      subQuery: false,
    });

    const result = {
      count: amount,
      data: data,
    };

    next(templateResponse(200, true, "Success get all event", result, null));
  } catch (error) {
    console.log(error);
    next(templateResponse(500, false, "Error get all event", null, error.message));
  }
};

const getEventDetail = async (req, res, next) => {
  try {
    const result = await events.findOne({
      include: [
        {
          model: tickets,
          required: true,
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
      where: {
        id: req.params.id,
      },
    });

    if (result) {
      return res.status(200).send(result);
    } else {
      return res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
    next(templateResponse(500, false, "Error get event detail", null, error.message));
  }
};

module.exports = { getEvent, getEventDetail };
