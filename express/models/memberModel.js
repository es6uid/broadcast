const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Please add a text value']
    },
    email:{
        type: String,
        required: [true, 'Please add an email']
    },
    status:{
        type: Boolean,
        required: [true, 'Please status']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Member', memberSchema);
