const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages")
const {userJoin, getCurrUser} = require("./utils/users")
const app = express();
const server = http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))




const admin = "Admin";


// io.on("connection", socket => {
//     socket.on('joinRoom', ({ username, room }) => {
//         const user = userJoin(socket.id , username, room);

//         socket.join(user.room)
//         socket.emit("message", formatMessage(admin, "Welcome to chat app"))

//         // Broadcast a message when a user connects except the user connecting
//         socket.broadcast.to(user.room).emit("message", formatMessage(admin, `${user.username} has joined chat`))
//     })

//     // Listen for chat message
//     socket.on("chatMessage", (msg) => {
//         const user = getCurrUser(socket.id);

//         io.to(user.room).emit("message", formatMessage(user.username, msg))
//     })

        

//     // Runs when client disconnects
//     socket.on("disconnect", () => {
//         io.emit("message", formatMessage(admin, `has left the chat`))
//     })

// })


    // io.on("connection", socket => {
    //     socket.on('joinRoom', ({ username, room }) => {
    //         const user = userJoin(socket.id , username, room);
    //         socket.join(user.room)
    //         socket.emit("message", formatMessage(admin, "Welcome to chat app"))
    //         socket.broadcast.to(user.room).emit("message", formatMessage(admin, `${user.username} has joined chat`))
    //     })

    //     // Listen for chat message
    //     socket.on("chatMessage", (msg) => {
    //         const user = getCurrUser(socket.id);

    //         io.to(user.room).emit("message", formatMessage(user.username, msg))
    //     })
    // })


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.post("/", function(req, res){
    res.redirect("/chat")
})


app.get("/chat", function(req, res){
    // var nsp = io.of("/"+req.query.username)

    io.on("connection", socket => {

        socket.on('joinRoom', ({ username, receiver }) => {
            const user = userJoin(socket.id , username, receiver);
            socket.join(user.username)

            // socket.emit("message", formatMessage(admin, "Welcome to chat app"))
            // socket.broadcast.to(user.receiver).emit("message", formatMessage(admin, `${user.username} has joined chat`))
            // socket.broadcast.to(user.username).emit("message", formatMessage(admin, `${user.username} has joined chat`))
        })

        // Listen for chat message
        socket.on("chatMessage", (msg) => {
            const user = getCurrUser(socket.id);
            socket.to(user.receiver).emit("message", formatMessage(user.username, msg))
    console.log("Cout")

        })

    })
    res.sendFile(path.join(__dirname+'/public/chat.html'))
})



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});