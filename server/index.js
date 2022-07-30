const express = require('express')
const http = require('http')
const cors= require('cors')
const app= express()
const {Server}=require("socket.io")
app.use(cors())
const server=http.createServer(app)
const io =  new Server(server,{
     cors:{
          origin:"http://localhost:3000",//which is gonna call the socket io server 
          methods:["GET","POST"],

     }
})
io.on("connection",(socket)=>{
console.log(`userConnected ${socket.id}`)
socket.on("join_room",(data)=>{
     socket.join(data);
     console.log(`user connected to id ${socket.id} and room id ${data}`);
});
socket.on("send_message",(data)=>{
     socket.to(data.room).emit("recieve_message",data)
     console.log(data)
});
socket.on("disconnect",()=>{
     console.log('user disconnected',socket.id) 
})
})
server.listen(3001,()=>{
     console.log("running")
}) 