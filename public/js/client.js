serverLocation = self.location.href
const socket = io(serverLocation); //location of where server is hosting socket app

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
    //Clear typing status
    typing.innerHTML = "";

    //Create <strong> with the username/data.handle inside
    let usernameElement = document.createElement('strong')
    usernameElement.appendChild(document.createTextNode(data.handle))

    //Create <p> with text inside
    let textElement = document.createElement('p')
    textElement.appendChild(document.createTextNode(data.message))

    //DIV holding the username and message
    let messages = document.createElement('div')
    messages.appendChild(usernameElement)
    messages.appendChild(textElement)

    output.appendChild(messages)
})

socket.on('userTyping', (data) => {
    console.log(data) //testing value in data
    typing.innerHTML = '$(data) is typing...'
})