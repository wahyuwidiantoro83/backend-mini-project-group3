'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  promos.init({
    idTicket: DataTypes.INTEGER,
    promoName: DataTypes.STRING,
    discountAmount: DataTypes.INTEGER,
    userLimit: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'promos',
  });
  return promos;
};