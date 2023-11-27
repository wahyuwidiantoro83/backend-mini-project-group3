'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accountDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE
      },
      telp: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      document: {
        type: Sequelize.STRING
      },
      bankAcc: {
        type: Sequelize.STRING
      },
      reffCode: {
        type: Sequelize.STRING
      },
      idAuth: {
        type: Sequelize.INTEGER
      },
      idPoint: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accountDetails');
  }
};