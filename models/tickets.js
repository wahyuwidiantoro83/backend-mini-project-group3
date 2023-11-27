'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tickets.belongsTo(models.events,{foreignKey:"id_event"})
      tickets.hasMany(models.promos,{foreignKey:"id_ticket"})
    }
  }
  tickets.init({
    id_event: DataTypes.INTEGER,
    ticket_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    sales_start: DataTypes.STRING,
    sales_end: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tickets',
  });
  return tickets;
};