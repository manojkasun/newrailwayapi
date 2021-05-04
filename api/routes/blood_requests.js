const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BloodReq = require('../models/blood_requests.js');

router.get('/', (req, res, next) => {
   
BloodReq.find()
  .select('_id hospitel hospitelAddress hospitelcontact blood postedDate details created_at district city')
  .exec()
  .then(docs => {
      console.log(docs);
      if(docs.length >= 1){
      res.status(200).json(docs);
      }
      else{
          res.status(404).json({
              message: 'No Blood Requests Found'
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


//get user's district blood requests
router.get('/:id', (req, res, next) => {
    const district = req.params.id;
    const setdistrict = district.charAt(0).toUpperCase() + district.slice(1)
    BloodReq.find({district: setdistrict})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No Blood Request Found From Your District' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})

module.exports = router; 