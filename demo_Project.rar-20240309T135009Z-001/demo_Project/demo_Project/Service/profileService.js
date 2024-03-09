const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const profileHelper = require('../helpers/profilehelper.js');
const profilehelper = new profileHelper();


class profileService {
    constructor() { }

    async profileCreation(payload) {
        try {
            let data = {
                fullName: payload.fullName,
                emailId: payload.emailId,
                phoneNumber: payload.phoneNumber,
                profilePhoto: payload.profilePhoto
            }
            let isExisting = await profilehelper.checkIsExisting(data);
            let record = await profilehelper.insert(data);
            return record;
        } catch (err) {
            throw err;
        }
    }

    async uploadProfile(payload) {
        try {
            let record = await profilehelper.uploadProfile(payload);
            return record;
        } catch (err) {
            throw err;
        }
    }

    async getProfile(payload) {
        try {
            let query = { _id: payload._id };
            let record = await profilehelper.getDetails(query);
            return record;

        } catch (err) {
            throw err;
        }
    }


    async putProfileName(id, newName) {
        try {
            let query = { _id: id };
            let record = await profilehelper.putProfileName(query, newName);
            return record;

        } catch (err) {
            throw err;
        }
    }

}

module.exports = profileService
