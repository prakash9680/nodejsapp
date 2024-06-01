const User = require('../models/User')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const fs = require('fs');
const { sendResponse } = require('../../services/helper');

const register = async (req,res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            let formbody = req.body;
            bcrypt.hash(formbody.password, 10 , function(err, hash) {
                if (err) throw err;
                formbody.password = hash;
                const user = new User(formbody);
                user.save().then((data) => {
                     sendResponse(res, 201 , 'succes',{user: data});
                }).catch((error) => {
                     sendResponse(res, 400 , 'error');
                })
            });

        } catch(err) {
            sendResponse(res, 500 , 'server error', err);
        }
    } else {
       sendResponse(res, 400 , 'validation error', {error: result.errors});
    }
}

const login = async (req,res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            await User.findOne({email: req.body.email}).then((data) => {
                if (data) {
                    bcrypt.compare(req.body.password, data.password).then(function(result) {
                        if (result) {
                            let token = data.generateAuthToken();
                            sendResponse(res, 200 , 'success', {token:token });
                            
                        } else {
                            sendResponse(res, 400 , 'invalid password', []);
                        }
                    });
                } else {
                    sendResponse(res, 400 , 'no record found', []);
                }
            });

        } catch(err) {

            sendResponse(res, 500 , 'server error', err);
        }
    } else {
       sendResponse(res, 400 , 'validation error', {error: result});
    }
}


module.exports = {  register, login }