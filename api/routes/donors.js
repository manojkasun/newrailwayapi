const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Donor = require('../models/donors.js');

router.get('/', (req, res, next) => {
   
  Donor.find()
  .select('donorName password email phoneNumber nic type status city district bloodType')
  .exec()
  .then(docs => {
      console.log(docs);
      if(docs.length >= 1){
      res.status(200).json(docs);
      }
      else{
          res.status(404).json({
              message: 'No Donorss Found'
          });
      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  })
});
//donor signup route 
router.post('/signup', (req, res, next) => {
    Donor.find({ userName: req.body.userName})
    .exec()
    .then(donor => {//check if the user name allready taken
        if(donor.length >= 1) {
            return res.status(409).json({
                message: 'donor name Already Taken. Use Another one or add a Number'
            });
        }
        else{
            bcrypt.hash(req.body.password, 10,(err, hash) => { //hash the password using bcrypt
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }
                else{
                    const donor = new Donor({
                        _id: new mongoose.Types.ObjectId(),
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hash,
                        phoneNumber: req.body.phoneNumber,
                        homeNumber: req.body.homeNumber,
                        nic: req.body.nic,
                        type: req.body.type,
                        status: req.body.status,
                        birthYear: req.body.birthYear,
                        city: req.body.city,
                        district: req.body.district,
                        created_on: req.body.status,
                        update_on: req.body.status,
                    }); 
                    donor.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Sign up Sucessfully",
                            createdDonor: result
                        });
                  
                })
                    .catch(err => { 
                        console.log(err);
                        res.status(500).json({
                            error: err
                    });
                })
        }
    })
   
        }
    })
});

//login
router.post('/login', (req, res, next) => {
    Donor.find({ email: req.body.email})
    .exec()
    .then( donor => {
        if(donor.length < 1 ) {
            return res.status(404).json({
                message: 'donor doesn\'t exist to Given Email'
            });
        }
        bcrypt.compare(req.body.password, donor[0].password, (err, result) => {
        
            if(err)
            {
                return res.status(401).json({
                    message: 'Login Failed'
                });
            }
            if (result)
            {
               const token = jwt.sign({
                    email: donor[0].email,
                    donorId: donor[0]._id,
                    userName: donor[0].userName,
                    nic: donor[0].nic,
                    phoneNumber: donor[0].phoneNumber,
                    homeNumber: donor[0].homeNumber,
                    city: donor[0].city,
                    district: donor[0].district,
                    type: donor[0].type,
                    status: donor[0].status,
                    bloodType: donor[0].bloodType,
                    birthYear: donor[0].birthYear,
                    created_on: donor[0].created_on,
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1200h" //set jwt key expire time as 1200 hours
                } );
                return res.status(200).json({
                    message: 'Login Sucessfull',
                    token: token
                });
            }
            return res.status(401).json({
                message: 'Login Failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})

//get all donors
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Donor.find({nic: id})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No donor Found that id' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})
router.put("/:email", (req, res, next) => {
    const email = req.params.email;
    const input = {
        birthYear: req.body.birthYear,
        district: req.body.district,
        city: req.body.city,
        bloodType: req.body.bloodType,
        phoneNumber: req.body.phoneNumber,
        homeNumber: req.body.homeNumber,
        update_on: new Date()
      } 
      for (const key of Object.keys(input)) {
        console.log(key, input[key]);
      }
  
    Donor.update({email: email}, { $set: input})
        .exec()
        .then(result => {
           console.log(result);
           res.status(200).json(result); 
        })
        .catch(err => {
            console.log('Error found ',err);
            res.status(500).json({
                error:err
            });
        });
   
});

module.exports = router; 