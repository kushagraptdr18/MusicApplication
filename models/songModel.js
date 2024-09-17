const mongoose = require('mongoose');


const songSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  singerName: {
    type: String,
    // required: true
  },
  album: {
    type: String,
    // required: true
  },
  genre: {
    type: String,
    // required: true
  },
  songFile: {
    data: Buffer, // Store the song file as binary data
    contentType: String, // Store the content type of the song file (e.g., 'audio/mpeg')
    // required: true
  },
  thumbnailImg: {
    data: Buffer, // Store the thumbnail image as binary data
    contentType: String, // Store the content type of the image (e.g., 'image/jpeg')
    // required: true
  }
}, { timestamps: true });

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
