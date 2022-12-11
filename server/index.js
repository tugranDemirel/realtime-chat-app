import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import socket from 'socket.io'
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messagesRoute.js'

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoutes)

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL,
    // error ları bastırmak için
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch(e =>{
        console.log(e)
    })

const io =socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

global.onlineUsers = new Map()
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    })

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieve', data.message)
        }
    })
})