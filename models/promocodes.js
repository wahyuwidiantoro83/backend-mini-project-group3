'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promocodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  promocodes.init({
    idPromo: DataTypes.INTEGER,
    codes: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'promocodes',
  });
  return promocodes;
};