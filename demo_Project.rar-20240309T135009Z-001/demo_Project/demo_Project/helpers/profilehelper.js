const Model = require("../model/profileSchema.js");
const { Errors } = require("../Codes/responseCodes.js");
const path = require('path');

class profileHelper {
  constructor() { }

  async insert(data) {
    const record = new Model(data);
    return await record.save();
  };

  async checkIsExisting(data) {
    try {
      let query = { emailId: data.emailId };
      let record = await Model.findOne(query);
      if (record) {
        throw Errors.PR001;
      }
      return record;
    } catch (err) {
      throw err;
    }
  }

  async uploadProfile(data) {
    try {
      // const localFilePath = path.join(__dirname, data.path);
      let record = { ...data};
      return record;
    } catch (err) {
      throw err;
    }
  }

  async getDetails(query) {
    try {
      let record = await Model.findOne(query).select('-__v');
      if (!record) {
        throw Errors.PR002;
      }
      return record;
    } catch (err) {
      throw err;
    }
  }

  async putProfileName(query, newName) {
    try {
      const options = { new: true, select: '-__v' };
      let record = await Model.findOneAndUpdate(query, { fullName: newName }, options);
      if (!record) {
        throw Errors.PR002;
      }
      return record;
    } catch (err) {
      throw err;
    }
  }

}

module.exports = profileHelper
