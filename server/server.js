const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

let contactList = [];

app.use(express.static(__dirname + '/client'))

// Espera conexão
io.on('connection', (socket) => {
  
  socket.on('get list', () => {
    io.emit('updated list', contactList)
  })

  socket.on('add contact', (contact) => {
    if (!contact.name && !contact.email && !contact.number) {
      return;
    }

    contact.id = Math.random().toString().substr(2,10)
    contactList.push(contact)

    io.emit('updated list', contactList)
  })

  socket.on('remove contact', (removedId) => {
    contactList = contactList.filter(c => c.id !== removedId)

    io.emit('updated list', contactList)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
