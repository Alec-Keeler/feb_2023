'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MusicianInstrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MusicianInstrument.belongsTo(models.Musician, {foreignKey: 'musicianId'})
      MusicianInstrument.belongsTo(models.Instrument, {foreignKey: 'instrumentId'})
    }
  }
  MusicianInstrument.init({
    musicianId: DataTypes.INTEGER,
    instrumentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MusicianInstrument',
  });
  return MusicianInstrument;
};