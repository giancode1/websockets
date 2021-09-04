const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id)

    socket.emit('messages', {
        id: 1,
        text: 'Hola soy un Mensaje',
        author: 'Giancarlo',
    })

    socket.on('client', data => console.log(data))

})

server.listen(3000, ()=>{
    console.log('Server on port', 3000)
})


