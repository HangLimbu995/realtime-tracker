const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// Set the view engine to ejs
app.set("view engine", "ejs")

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")))

io.on('connection', (socket) => {
    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data })
    })

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id)
    })
})

app.get('/', (req, res) => {
    res.render('index')
})

server.listen(3000)