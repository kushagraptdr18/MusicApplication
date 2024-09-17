const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cookieParser());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const db  = require('./config/mogoose-connection')

const userModel = require('./models/userModel')
const songModel = require('./models/songModel')



const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);

const indexRouter = require('./routes/indexRouter');
const songRouter = require('./routes/songRouter');
const { log } = require('console');


io.on("connection",function(socket){
    console.log("connected"); 
   
    socket.on("songId", async function(id){

        let{userid,songid}=id
        let user = await userModel.findById(userid); // Use findById for a single user
        const song = await songModel.find({ _id : songid},{ songFile: 0, thumbnailImg: 0});

        
        user.playlist.push(song);
        
        
        await user.save();
        
        
        var last= user.playlist.length;
        
        console.log(user.playlist[last-1][0]);
        

        socket.emit("updatedUser",user.playlist[last-1][0]);
              
       
    }) 


})


app.use('/',indexRouter);
app.use('/song',songRouter)


server.listen(3000, () => {
    console.log('Server running on port 3000');
});