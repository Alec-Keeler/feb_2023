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
   await queryInterface.bulkInsert('Abilities', [
     { name: 'Healing Factor', effect: 'Fast recovery from severe injuries' },
     { name: 'Telepathy', effect: 'A way of communicating through thoughts' },
     { name: 'Penance Stare', effect: 'Induces self-mortification by imposing him or her every negative actions, behavior and sensation, and sins to the pain of others that individual has ever committed in their lifetime.' },
     { name: 'Super Strength', effect: 'The ability to lift and move massive objects, crush or break through barriers, and engage in hand-to-hand combat with tremendous force.' },
     { name: 'Mind control', effect: 'The ability to control the thoughts and actions of others. This superpower would give you complete control over anyone you encounter, allowing you to make them do whatever you want. You could use this power for good, to help people in need, or for evil, to achieve your own selfish goals.' },
     { name: 'Enhanced speed and agility', effect: 'Fast and leap far distances' }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Abilities')
  }
};
