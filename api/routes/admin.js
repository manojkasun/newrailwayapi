const Admin = require('../models/admin');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//donor signup route 
router.post('/create', (req, res, next) => {
    Admin.find({ name: req.body.name})
    .exec()
    .then(admin => {//check if the user name allready taken
        if(admin.length >= 1) {
            return res.status(409).json({
                message: 'Admin already registered'
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
                    const admin = new Admin({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        created_at: req.body.created_at,
                    }); 
                    admin.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Created Sucessfully",
                            createdAdmin: result
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

router.delete('/deleteadmin', async(req, res) => {
    try {
        await Admin.deleteOne({
            email: req.body.email
        });
        res.send({ "message": "success" });
    } catch (error) {
        res.send({ error });
    }
});


module.exports = router;