const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000
app.use(express.static(__dirname + '/public'))

let socketsConected = new Set()

io.on('connection', (socket) => {
    console.log('socket connected: ', socket.id)
    socketsConected.add(socket.id)
    io.emit('clients-total', socketsConected.size)

    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id)
        socketsConected.delete(socket.id)    
        io.emit('clients-total', socketsConected.size)
    }) 

    socket.on('message', (data) => {
        //console.log(data)
        socket.broadcast.emit('chat-message', data)
    })  

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
      })

})

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})


