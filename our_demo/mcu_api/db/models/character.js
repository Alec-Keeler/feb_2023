'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.belongsTo(models.Affiliation, {
        foreignKey: 'affilId' // affiliationId
      })
        // JOIN Affiliations ON (Characters.affilId = Affiliations.id)
      Character.belongsToMany(models.Ability, {
        through: models.CharacterAbility,
        foreignKey: 'characterId',
        otherKey: 'abilityId'
      })
        // JOIN CharacterAbilities ON (Characters.id = CharacterAbilities.characterId)
        // JOIN Abilites ON (CharacterAbilities.abilityId = Abilities.id)
    }
  }
  Character.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, // NOT NULL
      unique: true, //UNIQUE
      validate: {
        isNotStark(value) {
          if (value === 'Tony Stark') {
            throw new Error('Can not add Tony Stark to this DB')
          }
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      validate: {
        min: 12,
        max: 99
      }
    },
    powered: {
      type: DataTypes.BOOLEAN,
      validate: {
        isPowered(value) {
          if (value === true && !this.alias) {
            throw new Error('Powered characters must have an alias')
          }
        }
      }
    },
    alias: {
      type: DataTypes.STRING,
    },
    popularity: DataTypes.NUMERIC(4, 2),
    affilId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Character',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'popularity']
      }
    },
    scopes: {
      isSuper: {
        where: {
          powered: true
        }
      },
      getByAffiliation(name) {
        const { Affiliation } = require('../models')
        return {
          include: {
            model: Affiliation,
            where: {
              name: name
            }
          },
        }
      }
    }
  });
  return Character;
};