"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class auths extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auths.hasMany(models.events, { foreignKey: "idPromotor" });
      auths.hasOne(models.accountDetails, { foreignKey: "idAuth" });
    }
  }
  auths.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      token: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "auths",
    }
  );
  return auths;
};
