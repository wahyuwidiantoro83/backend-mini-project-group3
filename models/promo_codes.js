'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promo_codes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      promo_codes.belongsTo(models.promos,{foreignKey:"id_promo"})

    }
  }
  promo_codes.init({
    id_promo: DataTypes.INTEGER,
    code: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'promo_codes',
  });
  return promo_codes;
};