'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Affiliations', [
     { name: 'Guardians of the Galaxy', baseLocation: 'The Benatar', isGood: true },
     { name: 'Defenders', baseLocation: 'Sanctum Sanctorum', isGood: true },
     { name: 'Avengers', baseLocation: 'Avengers Tower', isGood: true },
     { name: 'X-Men', baseLocation: 'Xavier\'s School for Gifted Youngsters', isGood: true },
     { name: 'S.H.E.I.L.D.', baseLocation: 'Triskellion', isGood: null }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Affiliations')
  }
};
