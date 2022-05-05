const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Add a description']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)