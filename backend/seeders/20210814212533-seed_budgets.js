'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('budgets', [
      {
        name:'Bills',
        amount: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('user_budget', [
      {
        userId: 1,
        budgetId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('budgets', null, {});
    await queryInterface.bulkDelete('user_budget', null, {});
  }
};
