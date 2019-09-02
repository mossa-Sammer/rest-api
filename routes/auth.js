const router = require('express').Router();

const User = require('../model/user');

const bycrptjs = require('bcryptjs');

const Joi = require('@hapi/joi');

const schema = {
  name:Joi.string().min(3).max(30).required(),
  email:Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
};

router.post('/register', async (req, res) => {

  const { error }  = Joi.validate(req.body,schema);
  if(error){
    return res.status(400).send(error.details[0].message);
  }
  // can't register with exsisting email
  const emailExsists = await User.findOne({email:req.body.email});
  
  if(emailExsists) return res.status(400).send('Email already exsits');

  // generate salt
  const salt = await bycrptjs.genSalt(10);
  // hash the password with the salt
  const hashedPassword = await bycrptjs.hash(req.body.password, salt);


  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:hashedPassword,
  });

  try{
    const savedUser = await user.save();
    console.log('object', savedUser);
    res.send(savedUser);
  }catch(err){
    res.status(400).send(err);
  }
});

module.exports = router;
