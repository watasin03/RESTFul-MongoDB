const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.user_register = (req,res,next)=>{
    User.find({email: req.body.email})
        .exec()
        .then(user =>{
            if(user.length >= 1){
                return res.status(409).json({
                    message:"Your email exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10,(err,hash)=> {
                    if(err){
                        return res.status(500).json({
                            error:err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            branch: req.body.branch
                    });
                    user
                    .save()
                    .then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message:'User Created'
                        });
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }
            });
        }
    })
};

exports.user_login = (req,res,next)=> {
    User.find({
        email:req.body.email
    })
    .exec()
    .then(user =>{
        if(user.length < 1){
            res.status(404).json({
                message:'email not found, user doesn\'t exit'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Auth Failed'
                });
            }
            if(result){
              const token =  jwt.sign(
                {
                    email:user[0].email,
                    userId:user[0]._id,
                    name:user[0].name,
                    branch: user[0].branch
                },
                config.get('key'), 
                {
                    expiresIn:'1h'
                });
                return res.status(200).json({
                    message:'Auth Successful',
                    token: token
                });
            }
            res.status(401).json({
                message:'Auth Failed'
            });
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
}

exports.user_delete = (req ,res ,next) =>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"User Removed"
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.user_update = (req ,res ,next) =>{
    const props = req.body;
    User.update({_id: req.params.userId},props)
    .exec()
    .then(result =>{
        res.status(201).json({
            message:"User Update",
            result: result
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.user_detail = (req ,res ,next) =>{
    User.find({
        email:req.params.userEmail
    })
    .then(result =>{
        res.status(201).json({
            message:'Success',
            result: result
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.user_all = (req ,res ,next) =>{
    User.find()
    .select('email name branch _id')
    .then(docs =>{
        res.status(200).json({
            result: docs
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};
