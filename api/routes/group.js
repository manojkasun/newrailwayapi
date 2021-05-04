const express = require('express');
const router = express.Router();
const Group = require('../models/group.js')
const mongoose = require('mongoose');



router.post('/', (req, res, next) => {
    const post = new Group ({
        _id: new mongoose.Types.ObjectId(),
        details: req.body.details,
        donorID: req.body.donorID,
        date: req.body.date,
        bloodGroup: req.body.bloodGroup,
        district: req.body.district,
        name: req.body.name

    });

    post
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Posted successfull",
            createdPost: result
        });
  
})
    .catch(err => console.log(err));
    
    res.status(201).json({
        message: 'POST REq /Post',
        createdPost: post
    });
});

//get user's posts
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Group .find({bloodGroup: id})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No post Found Blood Group' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})



module.exports = router;