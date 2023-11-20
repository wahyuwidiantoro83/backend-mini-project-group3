"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactionDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactionDetails.belongsTo(models.transactions);
      transactionDetails.belongsTo(models.tickets);
    }
  }
  transactionDetails.init(
    {
      idTransaction: DataTypes.INTEGER,
      idTicket: DataTypes.INTEGER,
      ticketCode: DataTypes.STRING,
      subTotal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transactionDetails",
    }
  );
  return transactionDetails;
};
