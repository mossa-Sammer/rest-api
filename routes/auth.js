const router = require('express').Router();

const User = require('../model/user');


const Joi = require('@hapi/joi');

const schema = {
  name:Joi.string().min(3).max(30).required(),
  email:Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
};

 
router.post('/register', async (req,res)=>{
  // res.send('register');
  // console.log(req.body);
  const { error }  = Joi.validate(req.body,schema);
  
  if(error){
    res.send(error.details[0].message);
  }
  // const user = new User({
  //   name:req.body.name,
  //   email:req.body.email,
  //   password:req.body.password,
  // });

  // try{
  // const savedUser = await user.save();
  // console.log('object', savedUser);
  // res.send(savedUser);

  // }catch(err){
  // res.status(400).send(err);
  // }

});

module.exports = router;