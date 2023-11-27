"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactions.hasMany(models.transactionDetails, { foreignKey: "idTransaction" });
    }
  }
  transactions.init(
    {
      invCode: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
      date: DataTypes.DATE,
      total: DataTypes.INTEGER,
      isPaid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "transactions",
    }
  );
  return transactions;
};
