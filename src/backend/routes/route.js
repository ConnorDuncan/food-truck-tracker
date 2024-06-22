const router = require('express').Router();
const {signup, email} = require('../controller/appController.js')

router.post('/user/email', (email)) //defines a POST route ('/user/email' that calls the email function)


module.exports = router;