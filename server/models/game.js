const mongoose = require('mongoose');
const schema = mongoose.Schema;

const gameSchema = new schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Game', gameSchema);