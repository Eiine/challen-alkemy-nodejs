const bcryptjs = require('bcryptjs');
const sequelize=require("../database/config/db");
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")
const asociation=require("../database/models/asociations");
//modelos para consultas
const Users = require('../database/models/users');
const character = require('../database/models/character');
const gender = require('../database/models/gender');
const character_movie = require('../database/models/character_movie');
const movie = require('../database/models/movie');
const gender_movie = require('../database/models/gender_movie');
const send=require("sendgrid")
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
        //Envio de correo electronico de vienvenida, revisar spam generalmente como se utilizo un dominio gratuito es catalogado asi
        const sgMail=require("@sendgrid/mail");
        sgMail.setApiKey("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");
        const msg={
        to: `${email}`,
        from: "yannokaiserfrom@gmail.com",
        subject: 'Bienvenido a api Disney',
        text: 'Bienvenido a api Disney, Muchas gracias por registrarte en la Api para conocer el mundo Disney esperamos que disfrutes tu estadía con nosotros. ',
    
        }

        sgMail.send(msg)
        
        res.send({message:"User create"})
        } catch (error) {
          console.log(error);          
        } 
                  
            
      },
      //login de api
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
          
            //llamada sin parametros
            if (query.name==undefined && query.age==undefined && query.movie==undefined && query.weight==undefined) {
              
              let characterList= await character.findAll({
                
                attributes: ['image', 'name'],             
               
               }) 
               
               res.send(characterList)   
              
              }else if (query.weight){
              
                let Character= await character.findAll({
                  where: {weight:req.query.weight},
                  
                  include:{ model: movie}
                  
                
                })   
                               
                res.send(Character)
            
              }else if (query.name){
              
              let Character= await character.findAll({
                where: {name:req.query.name},
                
                include:{ model: movie}
                
              
              })   
                             
              res.send(Character)
            
            
            }else if (query.age){
              console.log(query.age);
              let Character= await character.findAll({where: {age:query.age}})   
               
              res.send(Character)

            }else if (query.movie){
              console.log(query.movie);
              let movies= await movie.findAll({where: {id:req.query.movie}, include:{model:character,attributes: ['image', 'name']}})   
               
              res.send(movies)
            }
            else{
              res.send({message:"personaje o pelicula no encontrado"})
            }            
               
      },
      // CHARACTERS CREATE
      create: async (req, res) => {
            const id=req.params.id
            
            const {image, name, age, history,weight , pelicula}=req.body
            
            const  characters= await character.create({ 
              
              image:image, 
              name:name, 
              age:age, 
              history:history,
              weight:weight
             });
              
             try {
              
              if(pelicula!=undefined){
                const movies= await movie.findAll({where:{title:pelicula}})
                
                //vincula personaje con la pelicula 
                character_movie.create({
                  characterId:characters.id,
                  MovieId:movies[0].id
                })
                console.log(movies);
                
                }
                res.send({message:"character create"})
             } catch (error) {
              console.log(error);
              res.send({message:"character create"})
      }},
     
      //edicion de personajes
      update: async (req, res) => {
        const id=req.params.id
        
        const {image, name, age, history,weight, pelicula}=req.body
           
        const insertar = await character.update({ 
          
          image:image, 
          name:name, 
          age:age, 
          history:history,
          weight:weight
         }, {where:{id:id}})
         
         //crea el registro para vincular el personbaje con la pelicula
         if (pelicula!==undefined) {
          
        
         const movies= await movie.findAll({where:{title:pelicula}})
         const personaje= await character.findAll({id:id})
        
         character_movie.create({
          characterId:personaje[0].dataValues.id,
          MovieId:movies[0].dataValues.id
         })
          }
         
         res.send({message:"Character uptadte"})
      },
      //eliminacion de personajes
      delete: async (req, res) => {
        
        const id=req.params.id
        console.log(id);
        
           
        const insertar = await character.destroy({where:{id:id}})
         
        
         
         res.send({message:"Character delete"})
      },
      
         //controller para movie
        
         //movie list
      movie: async (req, res) => {
        
          const {title, genders , order}=req.query
         
          //const parametro= req.query.title
          //const movies= await movie.findAll({where:{title:parametro}, include:{model:character}}) 
          if (title==undefined && genders==undefined && order == undefined ) {
              
      
            let movies= await movie.findAll({
              order:['creationDate'],
              attributes: ['image', 'title', "creationDate"]             
              
             }) 
                      
           
           res.send(movies)
           
          }else if (genders){

              
            let movies= await gender.findAll({
              where: {name:genders},
              include:{
                model:movie
              }
            }) 
          
            res.send(movies)         
          
          
          }else if (title){
              
            let movies= await movie.findAll({where: {title:title},include:{ model: character}})
            
            res.send(movies)
          
          }else if (order.length==3){
              
            let movies= await movie.findAll({
              
              attributes: ['title', "creationDate"],
              order:[['creationDate', 'ASC']]
            }) 
          
            res.send(movies)
          
          }else if (order.length==4){
              
            let movies= await movie.findAll({
              
              attributes: ['title', "creationDate"],
              order:[['creationDate', 'DESC']]
            }) 
            res.send(movies)

          

        }},
           
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
        },

      movieUpdate: async (req, res) => {
            
           
      const id=req.params.id
      console.log(id);
      const {image, title, creationDate, calification, Character}=req.body
     
      
      const movies = await movie.update({ 

            image:image, 
            title:title, 
            creationDate:creationDate, 
            calification:calification
          }, {where:{id:id}})
      
      
      if(Character!=undefined){
      const personaje= await character.findAll({where:{name:Character}})
      const movies=await movie.findAll({where:{id:id}})
     
        
         character_movie.create({
          characterId:personaje[0].dataValues.id,
          MovieId:movies[0].dataValues.id
         })

    res.send({message:"Movie Update"})
  }
  res.send({message:"Movie Update"})
        },
        
      movieDelete: async (req, res) => {
            
          const {id}=req.params
          console.log(id);
                       
          const insertar = await movie.destroy({where:{id:id}})
    
          res.send({message:"Movie delete"})
        },

      gender: async (req, res) => {
            
          const mostrar= await gender.findAll({
            include:movie
          })

          res.send(mostrar)
          
        },

      genderCreate: async (req, res) => {
          const {name, image}=req.body
          
          const insertar= gender.create({

            name:name,
            image:image,
            movie:movie

          })
         
    
          res.send({message:"gender create"})
        },

      genderUpdate: async (req, res) => {
          const {title, genders}=req.body
          console.log(title, genders);
          // hay que buscar con find all tanto muvies como gender para asi poder 
          //asociarlos
          
          const genero= await gender.findAll({where:{name:genders}})
          const movies= await movie.findAll({where:{title:title}})
          console.log(genero[0].dataValues.id);
          console.log(movies[0].dataValues.id);
          
          const relacionar= gender_movie.create({
            GenderId:genero[0].dataValues.id,
            MovieId:movies[0].dataValues.id
          })
          
          
          
          res.send({message:"gender assigned"})
      
        }
              
          }





module.exports = mainController;