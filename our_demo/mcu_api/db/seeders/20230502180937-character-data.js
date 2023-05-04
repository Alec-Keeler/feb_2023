'use strict';
const { Character, Affiliation } = require('../models')

let charAffiliations = [
  {
    name: 'Guardians of the Galaxy', characters: [
      { name: 'Mantis', age: 32, powered: true, alias: 'Gross Bug Lady', popularity: 15 },
      { name: 'Groot', age: 18, powered: true, alias: 'Groot', popularity: 75 },
    ]
  },
  {
    name: 'Defenders', characters: [
      { name: 'Matt Murdock', age: 35, powered: 1, alias: 'Daredevil', popularity: 85.63 }
    ]
  },
  {
    name: 'Avengers', characters: [
      { name: 'Peter Parker', age: 18, powered: 1, alias: 'Spider-Man', popularity: 4.8 },
      { name: 'Wanda Maximoff', age: 29, powered: 1, alias: 'Scarlet Witch', popularity: 80 },
      { name: 'Carol Danvers', age: 56, powered: 1, alias: 'Captain Marvel', popularity: 4.1 },
      { name: 'T\'Challa', age: 35, powered: true, alias: 'Black Panther', popularity: 95 },
    ]
  },
  {
    name: 'X-Men', characters: [
      { name: 'Logan', age: 60, powered: 1, alias: 'Wolverine', popularity: 87.1 },
    ]
  },
  {
    name: 'S.H.E.I.L.D.', characters: [
      { name: 'Phil Coulson', age: null,  powered: false, alias: null, popularity: 100 },
    ]
  },
  {
    name: null, characters: [
      { name: 'Johnny Blaze', age: 23, powered: true, alias: 'Ghost Rider, Spirit of Vengeance', popularity: 0.72 },
    ]
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    for (let i = 0; i < charAffiliations.length; i++) {
      const affiliationObj = charAffiliations[i];
      const affil = await Affiliation.findOne({
        where: {
          name: affiliationObj.name
        }
      })
      // console.log(affil)
      const affiliationId = affil ? affil.id : null
      for (let j = 0; j < affiliationObj.characters.length; j++) {
        const character = affiliationObj.characters[j];
        await Character.create({
          affilId: affiliationId,
          name: character.name,
          age: character.age,
          powered: character.powered,
          alias: character.alias,
          popularity: character.popularity
        })
      }
    }
    // await queryInterface.bulkInsert('Characters', [
    //   { name: 'Matt Murdock', age: 35, affilId: 2, powered: 1, alias: 'Daredevil', popularity: 85.63 },
    //   { name: 'Mantis', age: 32, affilId: 1, powered: true, alias: 'Gross Bug Lady', popularity: 15 },
    //   { name: 'Groot', age: 18, affilId: 1, powered: true, alias: 'Groot', popularity: 75 },
    //   { name: 'Peter Parker', age: 18, affilId: 3, powered: 1, alias: 'Spider-Man', popularity: 4.8 },
    //   { name: 'Logan', age: 60, affilId: 4, powered: 1, alias: 'Wolverine', popularity: 87.1 },
    //   { name: 'Wanda Maximoff', age: 29, affilId: 3, powered: 1, alias: 'Scarlet Witch', popularity: 80 },
    //   { name: 'Carol Danvers', age: 56, affilId: 3, powered: 1, alias: 'Captain Marvel', popularity: 4.1 },
    //   { name: 'T\'Challa', age: 35, affilId: 3, powered: true, alias: 'Black Panther', popularity: 95 },
    //   { name: 'Johnny Blaze', age: 23, affilId: null, powered: true, alias: 'Ghost Rider, Spirit of Vengeance', popularity: 0.72 },
    //   { name: 'Phil Coulson', age: null, affilId: 5, powered: false, alias: null, popularity: 100 },
    // ]);
  },






  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete('Characters') // DELETE FROM Characters;
    await queryInterface.bulkDelete('Characters', {
      name: ['Matt Murdock', 'Mantis', 'Groot', 'Peter Parker', 'Logan', 'Wanda Maximoff', 'Carol Danvers', 'T\'Challa', 'Johnny Blaze', 'Phil Coulson']
      // name: 'Matt Murdock' // DELETE FROM Characters WHERE name = 'Matt Murdock';
    }) // DELETE FROM Characters WHERE name IN (...);
  }
};
