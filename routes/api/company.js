const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

let Company = require('../../models/Company');

router.get('/', async (req, res) => {
    try{
        const companyDB = await Company.find();
        res.send(companyDB);
    }catch(err){
        res.status(500).send('Server error');
    }
});

router.post('/',
  [
    check('company_name','Company Name is required').not().isEmpty(),
    check('company_email','Company Email is required').isEmail(),
    check('website','Website Detail is required').not().isEmpty(),
    check('contact_no','Contact Number is required').not().isEmpty(),
    check('address','Enter Address').not().isEmpty(),
    check('province','Enter Province').not().isEmpty(),
    check('postal','Enter Postal Code').not().isEmpty(),
  ]
  ,
  async (req, res) => {      

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
          }
        console.log(req.body);

        try{
  
          const newcompany =new Company ({
            company_name: req.body.company_name,
            company_email: req.body.company_email,
            website: req.body.website,    
            contact_no: req.body.contact_no,   
            address: req.body.address,
            province: req.body.province,
            postal: req.body.postal            
          });  

          await newcompany.save();

          const payload = {
            company: {
              id: newcompany.id,
              name: newcompany.company_name
            }
          };

          jwt.sign(
            payload,
            config.get('jwtsecret'),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
          
        }catch (err) {
          console.log(err);
          res.status(500).send('Server error');
        }       
     
    });

    router.delete('/:id',async (req, res) => {
        try{
            await Company.findByIdAndRemove({_id:req.params.id});     
            res.json("Record Deleted");
        }catch(err){
            res.status(500).send('Server error');
        }
        
    });

    router.put('/:id',
    [
      check('company_name','Company Name is required').not().isEmpty(),
      check('company_email','Company Email is required').isEmail(),
      check('website','Website Detail is required').not().isEmpty(),
      check('contact_no','Contact Number is required').not().isEmpty(),
      check('address','Enter Address').not().isEmpty(),
      check('province','Enter Province').not().isEmpty(),
      check('postal','Enter Postal Code').not().isEmpty(),
    ]
    ,async (req, res) => {

        const companyupdate = await Company.findById(req.params.id);  
        
        companyupdate.company_name = req.body.company_name,
        companyupdate.company_email = req.body.company_email,
        companyupdate.website = req.body.website,    
        companyupdate.contact_no = req.body.contact_no,   
        companyupdate.address = req.body.address,
        companyupdate.province = req.body.province,
        companyupdate.postal = req.body.postal 
       
        
        await companyupdate.save();
        res.send("Record Updated");
       });

  module.exports = router;