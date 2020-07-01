// io needs to use HTTP, express will still be the middleware for routes
const express = require('express')
const app = express(); //creates the express app
const httpserver = require('http').createServer(app); //app is an http server
const io = require('socket.io')(httpserver);

const port = process.env.PORT || 3000;

// http server listening on port
httpserver.listen(port, function(){
    console.log('listening on *:' + port);
  });

  app.use("/public", express.static('./public/')); //The folder that houses all our files

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

  io.on('connection', function(socket){
    console.log('client is connected ' + socket.id)

    socket.on('userMessage', (data) => {
        io.sockets.emit('userMessage', data)
    });

    socket.on('userTyping', (data) => {
        socket.broadcast.emit('userTyping', data)
    })

  });