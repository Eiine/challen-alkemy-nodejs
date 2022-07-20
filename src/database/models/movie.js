const { Sequelize, DataTypes } = require('sequelize');
const { characters } = require('../../controller/main');

const sequelize = require('../config/db');
const Character = require('./character');


const Movie= sequelize.define('Movie', {
  
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
    image: {
    type: DataTypes.STRING,
    allowNull: false
  },
    title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  creatrionDate:{
    type: DataTypes.DATE,
    allowNull: false
  },
  
    calification: {
        type: DataTypes.INTEGER,
        allowNull: false
  }
  
  
  

}, {
  
  
    timestamps: false
  
});

module.exports=Movie;

Movie.associate = function () {
  Movie.belongsToMany(Character, { through: 'movie_character' });
  Character.belongsToMany(Movie, { through: 'character_movie' });
  };



