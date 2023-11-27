'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_auth: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM('user', 'promotor')
      },
      birth_date: {
        type: Sequelize.DATE
      },
      telp: {
        type: Sequelize.STRING
      },
      pict: {
        type: Sequelize.STRING
      },
      document: {
        type: Sequelize.STRING
      },
      bank_acc: {
        type: Sequelize.STRING
      },
      reff_code: {
        type: Sequelize.STRING
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('account_details');
  }
};