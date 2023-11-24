const { Op } = require("sequelize");
const { cities } = require("../models");
const getCity = async (req, res, next) => {
  const result = await cities.findAll({
    where: {
      city: {
        [Op.substring]: req.query.city || "",
      },
    },
    limit: 3,
  });
  return res.status(200).send(result);
};

module.exports = { getCity };
