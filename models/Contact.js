const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    fname:{
        type : String,
        required:true
    },
    lname:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true,
        unique:true
    },
    contact_no:{
        type : String,
        required:true
    },
    province:{
        type : String,
        required:true
    },
    reason:{
        type : String,
        required : true
    }
});

const Contact = mongoose.model('contactdb',ContactSchema);
module.exports = Contact;