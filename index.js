const express=require('express');

const app=express()
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const image=require('./Route/imageRoute');
const folder=require('./Route/folderRoute')
const events=require('./Route/EventRoute')
const user=require('./Route/userRoute')
const mediaplayer=require('./Route/mediaplayerRoute')
const cors = require('cors');
const cookieParser=require('cookie-parser')


const fs = require('fs');
const http=require('http');
const path=require('path');
const {initializeSocket} = require('./socket');




app.use(express.json())
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => { console.log("database connected successfully done") })
//app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: '*',  // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Allow credentials like cookies to be sent
}));
app.use(cookieParser());
app.use('/api/v1',image);
app.use('/api/v1',folder);
app.use('/api/v1',events);

app.use('/api/v1',user)
app.use('/api/v1',mediaplayer);


const server=http.createServer(app)


const io=initializeSocket(server)

//handling websocket api
//io.on('connection',(socket)=>{
//  console.log("client connected",socket.id)



//})



app.get('/socket',(req,res)=>{

  res.sendFile(path.join(__dirname, 'socket.html'));

})



server.listen(process.env.PORT||8000,()=>{
  
  console.log("SERVER IS RUNNING ON PORT NUMBER  +"+`${process.env.PORT}`)
  
})