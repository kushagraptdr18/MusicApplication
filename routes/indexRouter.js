
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const { landingPageController, RegisterPageController, postRegisterContoller, profilePageController, postLoginPageController, logout } = require('../controllers/indexController');

const { isLoggedIn }=require('../middlewares/auth-middlewares')

router.get("/",landingPageController)
router.post('/login',postLoginPageController)
router.get('/register',RegisterPageController)
router.post('/register',upload.single('profileImage'),postRegisterContoller)
router.get('/profile',isLoggedIn,profilePageController)
router.get('/logout',logout)




module.exports=router;