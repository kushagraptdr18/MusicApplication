
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const { createSongPageController, postCreateSongPageController, showAllSongPageController, ekSongPageController } = require('../controllers/songController');






router.get('/createSong',createSongPageController)
router.post('/uploadSong',upload.single('song'),postCreateSongPageController)

router.get('/showAllSongs',showAllSongPageController)

router.get("/:id",ekSongPageController);



module.exports=router;