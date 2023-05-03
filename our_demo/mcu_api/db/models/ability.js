'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ability.belongsToMany(models.Character, {
        through: models.CharacterAbility,
        foreignKey: 'abilityId',
        otherKey: 'characterId'
      })
    }
  }
  Ability.init({
    name: DataTypes.STRING,
    effect: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Ability',
  });
  return Ability;
};