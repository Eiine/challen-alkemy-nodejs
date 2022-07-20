const bcryptjs = require('bcryptjs');
const sequelize=require("../database/config/db")
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")

//modelos para consultas
const Users = require('../database/models/users');
const character = require('../database/models/character');
const gender = require('../database/models/gender');
const content = require('../database/models/users');
const movie = require('../database/models/movie');
const mainController = {
  home: async (req, res) => {
        
    const {email, user, password}=req.body
    
     const usuarios= await Users.findAll()
     

     
    
   
  },  
  
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


      characters: async (req, res) => {
        //metodo get
        
               let show= await character.findAll({attributes: ['image', 'name']})
               let et= await character.findAll({association:"movie"})
              
                console.log(et);
               
               res.send(show)
          },

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
      update: async (req, res) => {
                //se obtienen los parametros para busqueda
                console.log(req.query);
                        res.send("enviado")  
                        console.log("distinto");
                  },

      delete: async (req, res) => {
                    //se obtienen los parametros para busqueda
                    console.log(req.query);
                            res.send("enviado")  
                            console.log("distinto");
                      },

    }





module.exports = mainController;