'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class juego extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  juego.init({
    idJuego: DataTypes.INTEGER,
    idPlataforma: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    categoria: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'juego',
  });
  return juego;
};