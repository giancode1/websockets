const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const messages = [{
    id: 1,
    text: 'Bienvenido al chat',
    author: 'Giancarlo',
}]

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id)

    socket.emit('server-messages', messages)

    socket.on('client-message', (data) => {
        console.log(data)
        messages.push(data)
        io.sockets.emit('server-messages',messages) //a todos los sockets les emite este evento
    })  

})

server.listen(3000, () => {
    console.log('Server on port', 3000)
})


