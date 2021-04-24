const app = require('express')();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT||5000;

app.get('/', (req, res) =>{
    res.send('Server is running');
})

io.on("connection",(socket)=>{
    socket.emit("me",socket.id);
    socjet.on("disconnect", ()=>{
        socket.broadcast.emit("callended");
    })
    socket.on("callUesr",({userToCall,signalData,from,name})=>{
        io.to(userToCall).emit("callUesr",{signal:signalData,from,name})
    })
    socket.on("answerCall",(data)=>{
        io.to(data.to).emit("callAcceppted",data.signal)
    });
})

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));