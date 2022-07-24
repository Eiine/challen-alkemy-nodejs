const bcryptjs = require('bcryptjs');
const sequelize=require("../database/config/db")
const { Op } = require("sequelize");
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")
const asociation=require("../database/models/asociations")
//modelos para consultas
const Users = require('../database/models/users');
const character = require('../database/models/character');
const gender = require('../database/models/gender');
const character_movie = require('../database/models/character_movie');
const movie = require('../database/models/movie');

const Movie = require('../database/models/movie');

const mainController = {
  
  
  register: async (req, res) => {
        
    try {
          const {email, user, password}=req.body
        //Es necesario convertir el contenido del body en string ya que este modulo
        //asi trabaja
        let passString=String(password)
        let passHash= await bcryptjs.hash(passString, 8)
        
        await Users.create({
          email:email,
          user:user,
          password:passHash
        })
        res.send("usuario creado")
        } catch (error) {
          console.log(error);          
        } 
                  
            
      },

      login: async (req, res) => {

        try {
          const {user, password }=req.body
          
           if (!user||!password) {
            res.send("Los campos user y password no pueden estar en blanco")

          }else{
          
          const chekUser= await Users.findOne({where: { user: user}})
          let pass= chekUser.dataValues.password
            //comparamos que el campo usuario no sea null y que el pass concuerde con el guardaro
          if (chekUser.length ==0 || !( await bcryptjs.compare(password, pass ))) {
              res.send({message:"Usuario o password son incorrectos"})
          }else{
            const id= chekUser.dataValues.id
            const token=jwt.sign({id:id},'secret', { expiresIn: "7d" })
            
            const cookiesOption={
              expires: new Date(Date.now()+ 90 *24*60*60*100),
              httpOnly:true
            }
            res.cookie("validacion", token, cookiesOption)
            res.send({message:"autenticacion correcta", token:token})
          }
          }      
            
        
         
        } catch (error) {
          res.send({message:"Usuario o passwor son incorrectos"})
        }
        
      },  

      //CHARACTERS LIST
      characters: async (req, res) => {
        const query=req.query
       
        //metodo get
          
          
            if (query.name==undefined && query.age==undefined && query.movie==undefined) {
              
              let characterList= await character.findAll({
                
                attributes: ['image', 'name'],             
               
               }) 
               
               res.send(characterList)            
            }else if (query.name){
              
              let Character= await character.findAll({
                where: {name:req.query.name},
                
                include:{ model: movie,
                              
                  
                  
                  
                }
                
              
              })   
               
              
              res.send(Character)
            }else if (query.age){
              let Character= await character.findAll({where: {age:req.query.age}})   
               
              res.send(Character)
            }else if (query.movie){
              let movie= await character.findAll({where: {IdMovie:req.query.IdMovie}})   
               console.log(movie);
              res.send(movie)
            }
            else{
              res.send({message:"personaje o pelicula no encontrado"})
            }
               
             
            
             
               
          },
      // CHARACTERS CREATE
      create: async (req, res) => {
            
            
            const {image, name, age, history,weight}=req.body
            
            const insertar = await character.create({ 
              
              image:image, 
              name:name, 
              age:age, 
              history:history,
              weight:weight
             });

             res.send({message:"Character create"})


              },
      //edicion de personajes
      update: async (req, res) => {
        const id=req.params.id
        console.log(id);
        const {image, name, age, history,weight}=req.body
           
        const insertar = await character.update({ 
          
          image:image, 
          name:name, 
          age:age, 
          history:history,
          weight:weight
         }, {where:{id:id}})
         
        
         
         res.send({message:"Character uptadte"})
        },

      delete: async (req, res) => {
        
        const id=req.params.id
        console.log(id);
        
           
        const insertar = await character.destroy({where:{id:id}})
         
        
         
         res.send({message:"Character delete"})
        },
      
      search: async (req, res) => {
        
          const parametro= req.query.name
          console.log(parametro);
           
          
           
           res.send({message:"Character delete"})
          },
        


    //controller para movie
      movieCreate: async (req, res) => {
            
            
          const {image, title, creationDate, calification, personaje}=req.body
         
          
        const movies = await movie.create({ 
    
                image:image, 
                title:title, 
                creationDate:creationDate, 
                calification:calification
                
   });

   if(personaje!=undefined){
    const characters= await character.findAll({where:{name:personaje}})
    
    //inserta los id de character y movi 
    character_movie.create({
      characterId:characters[0].id,
      MovieId:movies.id
    })
    }
    




   res.send({message:"Movie create"})


    }








    }





module.exports = mainController;