const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    fullName: String,
    emailId:String,
    phoneNumber:String,
    profilePhoto: String
});

const Record = mongoose.model('profileRecord', recordSchema);

module.exports = Record;
