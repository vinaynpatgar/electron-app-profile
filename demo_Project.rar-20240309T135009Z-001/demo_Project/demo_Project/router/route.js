const express = require('express');
const router = express.Router();
const profileController = require('../Controller/profileController.js')
const multer = require('multer');

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`)
    },
})
const upload = multer({ storage })

const profilepcontroller = new profileController();

router.post('/profileDetails',profilepcontroller.createProfile);
router.post('/upload',upload.single('profilePhoto'),profilepcontroller.uploadProfile);
router.get('/profileData',profilepcontroller.getProfile);
router.put('/profilenameupdate/:_id', profilepcontroller.putProfileName);

module.exports = router;