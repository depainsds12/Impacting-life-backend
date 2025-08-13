const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model("Badge", BadgeSchema);
