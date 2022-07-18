const bcryptjs = require('bcryptjs');
const Users = require('../database/models/users');
const sequelize=require("../database/config/db")
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")



const mainController = {
  home: async (req, res) => {
        
    const {email, user, password}=req.body
    
     const usuarios= await Users.findAll()
     

    
    res.send(usuarios)
   
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
          if (chekUser.length ==0 || !( await bcryptjs.compare(password, pass ) )) {
              res.send("Usuario o password incorrecto")
          }else{
            const id= chekUser.dataValues.id
            const token=jwt.sign({id:id},'secret', { expiresIn: "7d" })
            console.log(token, " para el usuario ",user  );
            const cookiesOption={
              expires: new Date(Date.now()+ 90 *24*60*60*100),
              httpOnly:true
            }
            res.cookie("validacion", token, cookiesOption)
            res.send("usuario autorizado")
          }
          }      
            
        
         
        } catch (error) {
          console.log(error)
        }
        
      },  
}





module.exports = mainController;