const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    games:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }]
});

module.exports = mongoose.model('User', userSchema);