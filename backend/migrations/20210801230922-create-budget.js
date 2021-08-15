const { Sequelize } = require('sequelize');
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('budgets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        defaultValue: 'none'
      },
      icon: {
        type: Sequelize.STRING,
        defaultValue: 'AttachMoney'
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('budgets');
  }
};