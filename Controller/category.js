const { categories } = require("../models");

const getCategory = async (req, res, next) => {
  const result = await categories.findAll();
  return res.status(200).send(result);
};

module.exports = { getCategory };
