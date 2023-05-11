'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Instrument.belongsTo(models.Store)
    }
  }
  Instrument.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Instrument',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    scopes: {
      keyboards: {
        where: {
          type: 'keyboard'
        }
      },
      strings: {
        where: {
          type: 'string'
        }
      },
      woodwinds: {
        where: {
          type: 'woodwind'
        }
      },
      getByStoreId(storeId) {
        const { Store } = require('../models')
        return {
          include: {
            model: Store,
            where: {
              id: storeId
            }
          },
          order: [['name']]
        }
      }
    }
  });
  return Instrument;
};