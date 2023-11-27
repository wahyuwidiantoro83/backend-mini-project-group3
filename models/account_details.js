'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      account_details.belongsTo(models.auth,{foreignKey:"id_auth"})
      account_details.hasMany(models.events,{foreignKey:"id_promotor"})
    }
  }
  account_details.init({
    id_auth: DataTypes.INTEGER,
    name: DataTypes.STRING,
    role: DataTypes.ENUM('user', 'promotor'),
    birth_date: DataTypes.DATE,
    telp: DataTypes.STRING,
    pict: DataTypes.STRING,
    document: DataTypes.STRING,
    bank_acc: DataTypes.STRING,
    reff_code: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'account_details',
  });
  return account_details;
};