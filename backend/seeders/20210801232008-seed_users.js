'use strict';
const bcrypt = require('bcrypt');

const SALT_ROUNDS=10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'demo',
        email: 'demo@demo.demo',
        hashedPassword: await bcrypt.hash('pw', SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
