const mongoose = require('mongoose');

const CTASchema = new mongoose.Schema({
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
    link1: String,
    link2: String,
    slug: [String]
});

module.exports = mongoose.model('CTA', CTASchema);