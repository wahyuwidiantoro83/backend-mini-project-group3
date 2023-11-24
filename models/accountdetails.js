"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class accountDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      accountDetails.belongsTo(models.auths, { foreignKey: "idAuth" });
    }
  }
  accountDetails.init(
    {
      name: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      telp: DataTypes.STRING,
      image: DataTypes.STRING,
      document: DataTypes.STRING,
      bankAcc: DataTypes.STRING,
      reffCode: DataTypes.STRING,
      idAuth: DataTypes.INTEGER,
      idPoint: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "accountDetails",
    }
  );
  return accountDetails;
};
