const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    event_title:{
        type : String,
        required:true
    },
    event_logo:{
        type : String,
        required:true        
    },
    company_name:{
        type : String,
        required:true
    },
    event_date:{
        type : String,
        required:true
    },
    event_time:{
        type : String,
        required:true
    },
    event_location:{
        type : String,
        required : true
    },
    event_desc:{
        type : String,
        required : true
    },
    total_seat:{
        type : String,
        required : true
    },
    registered:{
        type: String,
        required: true
    }
});

const Event = mongoose.model('events',EventSchema);
module.exports = Event;