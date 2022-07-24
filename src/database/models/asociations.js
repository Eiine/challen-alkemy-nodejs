const { Sequelize, DataTypes } = require('sequelize');
const character= require("./character")

const gender= require("./gender")
const movie= require("./movie")
const character_movie=require("./character_movie")

character.belongsToMany(movie, {through:"character_movie"})
movie.belongsToMany(character, {through:"character_movie"})