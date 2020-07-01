const socket = io('http://localhost:3000'); //location of where server is hosting socket app

// query DOM
const message = document.getElementById('message');
      handle = document.getElementById('handle');
      button =  document.getElementById('button');
      output = document.getElementById('output');
      typing = document.getElementById('typing');

//Sending 'typing...' message
message.addEventListener('keypress', () => {
    socket.emit('userTyping', handle.value)
})

// Emit events
button.addEventListener('click', () => {
    socket.emit('userMessage', {
        message: message.value,
        handle: handle.value
    })
    document.getElementById('message').value = "";
})

// Listen to events
socket.on('userMessage', (data) => {
    typing.innerHTML = "";
    output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>'
})

socket.on('userTyping', (data) => {
    typing.innerHTML = '<p><strong>' + data + ' is typing...</strong></p>'
})