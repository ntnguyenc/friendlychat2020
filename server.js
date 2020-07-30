// io needs to use HTTP, express will still be the middleware for routes
const express = require('express')
const app = express(); //creates the express app
const httpserver = require('http').createServer(app); //app is an http server
const io = require('socket.io')(httpserver);
const uuid = require('uuid');

const port = process.env.PORT || 3000;

// http server listening on port
httpserver.listen(port, function(){
    console.log('listening on *:' + port);
  });

  app.use("/public", express.static('./public/')); //The folder that houses all our files

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const users = [];
const connections = [];

  io.on('connection', (socket) => {
    console.log('New user connected ' + socket.id)
    connections.push(socket) //add the new socket to connections array

    //Set first user as username: 'Tang'.
    socket.username = 'Tang';

    socket.on('change_username', data => {
        let id = uuid.v4(); //create a random id for the user
        socket.id = id;
        socket.username = data.nickName;
        users.push({id, username: socket.username});
        updateUsernames();
    })

    //Update Usernames in the client
    const updateUsernames = () => {
        io.sockets.emit('get users', users)
    }

    //Broadcast the message
    socket.on('userMessage', (data) => {
        io.sockets.emit('userMessage', data)
    });

    socket.on('userTyping', (data) => {
        socket.broadcast.emit('userTyping', data)
    })
    
    //Disconnect
    socket.on('disconnect', data => {
        if(!socket.username)
            return;
        //find the user and delete from list
        let user = undefined;
        for(let i= 0;i<users.length;i++){
            if(users[i].id === socket.id){
                user = users[i];
                break;
            }
        }
        users.splice(user,1);
        //Update the users list
        updateUsernames();
        connections.splice(connections.indexOf(socket),1);
    })

  });