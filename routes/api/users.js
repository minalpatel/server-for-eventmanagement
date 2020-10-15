const express = require('express');

let user = require('../../models/User');

const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/',async(req,res)=> {

    try{
    const UserDb = await user.find()
    res.send(UserDb);
    }catch(err){
        res.status(500).send('Server error');
    }
    
  });

  router.post(
    '/',
    [
        check('first_name', 'first name is required').not().isEmpty(),
        check('last_name', 'last name is required').not().isEmpty(),
        check('company_name', 'Company name is required').not().isEmpty(),
      check('username','Enter valid username').isEmail(),
      check('password'). isLength({min:5}),
      check('usertype','usertype missing').not().isEmpty()
    ],
  async(req, res) => {
      
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        console.log(req.body);
       
          try {
          //check if user is there
        let user1 = await user.findOne({username: req.body.username});
        console.log("line 42");
        if(user1){
          return res.status(400).json({error: [{msg: 'user with same username already exist'}]});
        }
          const newUser = new user(
            {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              company_name: req.body.company_name,
              username: req.body.username,
              password: req.body.password,
              usertype: req.body.usertype
            });
            console.log("line 55");
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(req.body.password,salt);
        const nUser = await newUser.save();
        res.send("You have been successfully registered. PLease Login!!");
      } catch (err) {
          console.log(err);
          return res.status(400).json({ errors: [{ msg: 'Server error'}] });
      }
    }
  );

  router.post(
    '/login',
    [
        check('username', 'username is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
    ],
  async(req, res) => {
      
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body);
       
          try {
          //check if user is there
        let user1 = await user.findOne({username: req.body.username});
        if (!user1) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'No such User exist' }] });
        }
        let password = req.body.password;
        const isMatch = await bcrypt.compare(password, user1.password);
        if (!isMatch){
          return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const payload = {
          user1: {
            id: user1.id,
            first_name: user1.first_name
          }
        };
        jwt.sign(
          payload,
          config.get('jwtsecret'),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
         
      } catch (err) {
          console.log(err);
        res.status(500).send('Server error');
      }
    }
  );

  module.exports = router;