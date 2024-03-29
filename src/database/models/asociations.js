const { Sequelize, DataTypes } = require('sequelize');
const character= require("./character")

const gender= require("./gender")
const movie= require("./movie")
const character_movie=require("./character_movie")
const gender_movie=require("./gender_movie")



character.belongsToMany(movie, {through:"character_movie"})
movie.belongsToMany(character, {through:"character_movie"})

gender.belongsToMany(movie, {through:"gender_movie"})
movie.belongsToMany(gender, {through:"gender_movie"})