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
   await queryInterface.bulkInsert('CharacterAbilities', [
     { characterId: 1, abilityId: 1 },
     { characterId: 3, abilityId: 1 },
     { characterId: 5, abilityId: 1 },
     { characterId: 4, abilityId: 1 },
     { characterId: 6, abilityId: 2 },
     { characterId: 9, abilityId: 3 },
     { characterId: 10, abilityId: 3 },
     { characterId: 3, abilityId: 4 },
     { characterId: 4, abilityId: 4 },
     { characterId: 5, abilityId: 4 },
     { characterId: 7, abilityId: 4 },
     { characterId: 8, abilityId: 4 },
     { characterId: 9, abilityId: 4 },
     { characterId: 2, abilityId: 5 },
     { characterId: 6, abilityId: 5 },
     { characterId: 1, abilityId: 6 },
     { characterId: 4, abilityId: 6 },
     { characterId: 8, abilityId: 6 }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('CharacterAbilities')
  }
};
