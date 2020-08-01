serverLocation = self.location.href
const socket = io(serverLocation); //location of where server is hosting socket app

// query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const button =  document.getElementById('button');
const output = document.getElementById('output');
const typing = document.getElementById('typing');

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

    // Create a <strong> with the username/data.handle inside
    let usernameElement = document.createElement('strong')
    usernameElement.appendChild(document.createTextNode(data.handle))

    // Create a <p> with text inside
    let textElement = document.createElement('p')
    textElement.appendChild(document.createTextNode(data.message))

    // Div holding the other two
    let message = document.createElement('div')
    message.appendChild(usernameElement)
    message.appendChild(textElement)
    
    /* Message element looks like this:
        <div>
            <strong>data.handle</strong>
            <p>data.message</p>
        </div>
    */

    output.appendChild(message)
})

socket.on('userTyping', (data) => {
    // Changed HTML to already be <strong>
    typing.innerText = `${data} is typing...`
})
