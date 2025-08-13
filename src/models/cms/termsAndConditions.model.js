const mongoose = require('mongoose');

const termsAndConditionsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TermsAndConditions', termsAndConditionsSchema);