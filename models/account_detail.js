'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      account_detail.belongsTo(models.auth, {foreignKey: "authId"});
    }
  }
  account_detail.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    document: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    bank_acc: DataTypes.STRING,
    reff_code: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    authId: DataTypes.INTEGER,
    pointId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'account_detail',
  });
  return account_detail;
};