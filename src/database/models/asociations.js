const { Sequelize, DataTypes } = require('sequelize');
const character= require("./character")
const content= require("./content")
const gender= require("./gender")
const movie= require("./movie")


character.belongsToMany(movie, {through:"character_movie"})
movie.belongsToMany(character, {through:"movie_character"})