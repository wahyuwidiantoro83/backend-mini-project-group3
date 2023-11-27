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
      promos.belongsTo(models.tickets,{foreignKey:"id_ticket"})
      promos.hasMany(models.promo_codes,{foreignKey:"id_promo"})
    }
  }
  promos.init({
    id_ticket: DataTypes.INTEGER,
    promo_name: DataTypes.STRING,
    discount_amount: DataTypes.INTEGER,
    user_limit: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'promos',
  });
  return promos;
};