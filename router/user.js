const express = require('express');
const router = express.Router();
const controller =  require("../controller/usercontroller");
const auth =  require ("../middleware/jwtverification");
router.post('/registration',controller.register.post);
router.post('/login',controller.login.post);
router.put('/updateprofile',auth,controller.updateprofile.put);
module.exports = router;