const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    experience: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    order: Number
});

module.exports = mongoose.model('Testimonial', testimonialSchema);