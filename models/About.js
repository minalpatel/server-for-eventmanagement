const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    heading1: { type: String, required: true },
    desc1: { type: String, required: true },
    heading2: { type: String, required: true },
    desc2: { type: String, required: true },
    heading3: { type: String, required: true },
    desc3: { type: String, required: true }
});

const About = mongoose.model('about', AboutSchema);

module.exports =About;