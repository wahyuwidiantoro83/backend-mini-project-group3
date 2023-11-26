'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      events.belongsTo(models.cities,{foreignKey:"id_city"})
      events.hasMany(models.tickets,{foreignKey:"id_event"})
    }
  }
  events.init({
    id_promotor: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER,
    id_city: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.ENUM('online', 'offline'),
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    rt_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    start_hour: DataTypes.STRING,
    end_hour: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};