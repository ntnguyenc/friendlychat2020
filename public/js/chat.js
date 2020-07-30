$(function () {

    //buttons and inputs
    let message = $("#message");
    let send_message = $("#send_message");
    let chatroom = $("#chatroom");
    let feedback = $("#feedback");
    let usersList = $("#users-list");
    let nickName = $("#nickname-input");

        //Emit typing
    message.bind("keypress", e => {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode != '13'){
            socket.emit('typing')
        }
    });

       //Emit a username
       nickName.keypress( e => {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode == '13'){
            socket.emit('change_username', {nickName : nickName.val()});
            socket.on('get users', data => {
                let html = '';
                for(let i=0;i<data.length;i++){
                    html += `<li class="list-item" style="color: ${data[i].color}">${data[i].username}</li>`;
                }
                usersList.html(html)
            })
        }
    });

});