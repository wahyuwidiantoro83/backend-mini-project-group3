const db = require("../Helper/mysql");
const getDataEvent = (req, res) => {
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
};

module.exports = {
  getDataEvent,
};
