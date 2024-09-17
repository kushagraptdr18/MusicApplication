const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const userModel = require('../models/userModel');
const songModel = require('../models/songModel');



const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });





module.exports.createSongPageController = async (req,res)=>{

    res.render('createSong')

}

module.exports.postCreateSongPageController = async (req,res)=>{


const song = await songModel.create({
   
    title:req.body.title,
    singerName:req.body.singer,
    genre:req.body.genre,
    album:req.body.album,
    songFile: {
        data: req.file.buffer, // Store the song file as binary data
        contentType: req.file.mimetype, // Store the content type of the song file (e.g., 'audio/mpeg')
      },
})

console.log(song);
res.redirect('/song/createSong')

}

module.exports.showAllSongPageController = async (req,res)=>{
    const allSongs = await songModel.find({},{ songFile: 0, thumbnailImg: 0});
    res.json(allSongs);
}


module.exports.ekSongPageController = async (req,res)=>{
    
    try {
     
        const song = await songModel.findById(req.params.id);
        if (!song) {
            return res.status(404).send('Song not found');
        }
        
        console.log(song);
        
        res.setHeader('Content-Type', song.songFile.contentType);
        res.send(song.songFile.data);
    } catch (err) {
        res.status(500).send('Error playing the song');
    }
}