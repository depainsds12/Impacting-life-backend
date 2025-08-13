const mongoose = require('mongoose');

const howItWorksSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    order: {
        type: Number
    }
});

module.exports = mongoose.model('HowItWorks', howItWorksSchema);