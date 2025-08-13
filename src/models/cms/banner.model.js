const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    description: {
        type: String,
        required: true
    },
    link: String,
    image: {
        type: String,
        required: true
    },
    slug: [String]
});

module.exports = mongoose.model('Banner', bannerSchema);