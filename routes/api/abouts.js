const express = require('express');

let about = require('../../models/About');
const router = express.Router();

router.get('/',async(req,res)=> {

    try{
    const AboutDb = await about.find()
    res.send(AboutDb);
    }catch(err){
        res.status(500).send('Server error');
    }
    
  });

  module.exports = router;