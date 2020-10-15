const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    company_name:{
        type : String,
        required:true
    },
    company_email:{
        type : String,
        required:true,
        unique:true
    },
    website:{
        type : String,
        required:true        
    },
    contact_no:{
        type : String,
        required:true
    },
    address:{
        type : String,
        required:true
    },
    province:{
        type : String,
        required : true
    },
    postal:{
        type : String,
        required : true
    }
});

const Company = mongoose.model('company',CompanySchema);
module.exports = Company;