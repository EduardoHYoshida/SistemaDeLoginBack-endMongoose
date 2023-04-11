const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    name: {type:String, required: true, min:3, max:50},
    email: {type:String, required: true, min:3, max:100},
    passaword: {type:String, required: true, min:6, max:200},
    createAt: {type:Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema);