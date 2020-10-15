const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  question: {
    type: String
  },
  answer: {
    type: String
  }
});
const Faq = mongoose.model('faqs', FaqSchema);

module.exports = Faq;