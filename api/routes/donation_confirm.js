const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BloodConfirm = require('../models/donation_confirms.js');

router.get('/', (req, res, next) => {
BloodConfirm.find()
  .select('_id hospitel hospitelAddress hospitelcontact blood confirmDate details donorId city')
  .exec()
  .then(docs => {
      console.log(docs);
      if(docs.length >= 1){
      res.status(200).json(docs);
      }
      else{
          res.status(404).json({
              message: 'No Blood Request Confirms Found'
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
router.post('/', (req, res, next) => {
    const blood_confirm = new BloodConfirm({
        _id: new mongoose.Types.ObjectId(),
        hospitel: req.body.hospitel,
        hospitelAddress: req.body.hospitelAddress,
        hospitelcontact: req.body.hospitelcontact,
        bloodRequestId:req.body.bloodRequestId,
        confirmDate: req.body.confirmDate,
        details: req.body.details,
        requestedblood: req.body.requestedblood,
        donorBloodType: req.body.donorBloodType,
        city: req.body.city,
        donorId: req.body.donorId,
        donorContact: req.body.donorContact
    });

    blood_confirm
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Confirm Sent successfull",
            createdConfirm: result
        });
  
})
    .catch(err => console.log(err));
    
    res.status(201).json({
        message: 'POST REq /Post',
        createdConfirm: blood_confirm
    });
});


//get user's district blood requests
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    BloodConfirm.find({donorId: id})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No Blood Request Confirms Found From You' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})

module.exports = router; 