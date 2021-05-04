const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Record = require('../models/donationrecords.js');

router.get('/', (req, res, next) => {

    Record .find()
        .select('_id donorNIC bloodType donateDate addBy details ')
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 1) {
                res.status(200).json(docs);
            }
            else {
                res.status(404).json({
                    message: 'No Blood Donation Records Found'
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
    const nic = req.params.id;
    Record.find({ donorNIC: nic })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: 'No Blood Donation Record Found ' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
router.get('/count/:id', (req, res, next) => {
    const nic = req.params.id;
    Record.find({ donorNIC: nic })
    .count()
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: 'No Blood Donation Record Found ' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
})

module.exports = router; 