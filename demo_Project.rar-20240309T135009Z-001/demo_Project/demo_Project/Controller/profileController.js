const profileSevice = require("../Service/profileService.js");
const { Errors } = require("../Codes/responseCodes.js");

const profilesevice = new profileSevice();

class profileController {
  constructor() {}

  async createProfile(req, res) {
    try {
      const payload= req.body;
      const record = await profilesevice.profileCreation(payload);
      res.status(201).send({ success: "Profile created successfully", record });
    } catch (err) {
      console.log("error",err)
      if (Errors[err.errorCode]) {
        res.status(400).send({ errorText: Errors[err.errorCode].errorText,errorCode: err.errorCode});
      } else {
        res.status(500).send(err);
      }
    }
  }

  async uploadProfile(req, res) {
    try {
      const payload= req.file;
      const record = await profilesevice.uploadProfile(payload);
      res.status(201).send({ success: "Profile Photo Uploaded successfully", record });
    } catch (err) {
      console.log("error",err)
      if (Errors[err.errorCode]) {
        res.status(400).send({ errorText: Errors[err.errorCode].errorText,errorCode: err.errorCode});
      } else {
        res.status(500).send(err);
      }
    }
  }

  async getProfile(req, res) {
    try {
      const payload = req.query;
      const record = await profilesevice.getProfile(payload);
      res.status(201).send({ success: "Profile retrived successfully", record });
    } catch (err) {
      if (Errors[err.errorCode]) {
        res.status(400).send({errorText: Errors[err.errorCode].errorText,errorCode: err.errorCode});
      } else {
        console.log(err);
        res.status(500).send(err);
      }
    }
  }

   async putProfileName(req, res) {
    try {
      const id = req.params._id;
      const newName = req.body.fullName;
      const record = await profilesevice.putProfileName(id, newName);
      res.status(201).send({ success: "Profile Name Updated successfully", record });
    } catch (err) {
      if (Errors[err.errorCode]) {
        res.status(400).send({ errorText: Errors[err.errorCode].errorText, errorCode: err.errorCode });
      } else {
        console.log(err);
        res.status(500).send(err);
      }
    }
  }
}

module.exports = profileController;
