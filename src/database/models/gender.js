const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Movie = require('./movies');

const Gender= sequelize.define('Gender', {
  
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
 

}, {
  
  
    timestamps: false
  
});

module.exports=Gender;


Gender.associate = function () {
  Gender.hasMany(Movie, {as:"movies"})
  };


