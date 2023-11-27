"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tickets.hasMany(models.transactionDetails, { foreignKey: "idTicket" });
      tickets.belongsTo(models.events, { foreignKey: "idEvent" });
    }
  }
  tickets.init(
    {
      idEvent: DataTypes.INTEGER,
      level: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      ticketSalesStart:DataTypes.STRING,
      ticketSalesEnd:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "tickets",
    }
  );
  return tickets;
};
