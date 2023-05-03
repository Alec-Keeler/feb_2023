'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CharacterAbility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CharacterAbility.init({
    characterId: DataTypes.INTEGER,
    abilityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CharacterAbility',
  });
  return CharacterAbility;
};