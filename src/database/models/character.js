const { Sequelize, DataTypes } = require('sequelize');
const { characters } = require('../../controller/main');
const sequelize = require('../config/db');
const Movies= require('./movies');
const Character= sequelize.define('character', {
  
  
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
    name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
  },
  history: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weight:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
  
  
  

}, {
  
  
    timestamps: false
  
});


module.exports=Character;

/*
Character.belognsToMany(Movies,{
  through: "characterMovies",
  as:"movies",
  foreignKey:"characterId"
}

)
*/

Character.associate = function () {
  Character.belongsToMany(Movies, { through: 'caracter_movie' });
  Movies.belongsToMany(Character, { through: 'movie_character' });
  };


