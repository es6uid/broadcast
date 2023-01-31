const mongoose = require('mongoose');

const mediaSchema = mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Please add a text media iframe']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Media', mediaSchema);