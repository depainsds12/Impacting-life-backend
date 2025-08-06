const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Banner', bannerSchema);