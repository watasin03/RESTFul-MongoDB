const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{ 
        type: String, 
        require:true, 
        unique:true, 
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{ type: String, require:true },
    name:{ type: String, require: true },
    branch: {type: String, require: true},
});

const userModel = mongoose.model('userTB', userSchema);

module.exports = userModel;