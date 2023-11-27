"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      events.belongsTo(models.categories, { foreignKey: "idCategory" });
      events.belongsTo(models.cities, { foreignKey: "idCity" });
      events.belongsTo(models.auths, { foreignKey: "idPromotor" });
      events.hasMany(models.tickets, { foreignKey: "idEvent" });
      events.hasMany(models.promos, { foreignKey: "idEvent" });
    }
  }
  events.init(
    {
      name: DataTypes.STRING,
      idCity: DataTypes.INTEGER,
      address: DataTypes.STRING,
      type: DataTypes.STRING,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
      startHour: DataTypes.TIME,
      endHour: DataTypes.TIME,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      idCategory: DataTypes.INTEGER,
      idPromotor: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "events",
    }
  );
  return events;
};
