// io needs to use HTTP, express will still be the middleware for routes
const express = require('express')
const app = express(); //creates the express app
const http = require('http')
const socketIO = require('socket.io');
const path = require('path')

app.use("/public", express.static('./public/')); //The folder that houses all our files

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// http server listening on port
server = http.createServer(app)

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('listening on *:' + port);
});

io = socketIO(server)

io.on('connection', (socket) => {
  console.log('client is connected ' + socket.id)

  socket.on('userMessage', (data) => {
    io.sockets.emit('userMessage', data)
  });

  socket.on('userTyping', (data) => {
    socket.broadcast.emit('userTyping', data)
  })

}); 