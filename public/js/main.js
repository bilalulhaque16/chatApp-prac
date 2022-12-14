const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector('.chat-messages');

const {username, receiver} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// const socket = io();

// socket.emit("joinRoom", {username, room})

// // Message from server
// socket.on("message", message => {
//     console.log(message)

//     outputMessage(message)

//     chatMessages.scrollTop = chatMessages.scrollHeight;
// })

// // Message submit
// chatForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const msg = e.target.elements.msg.value;

//     // EMit msg to server
//     socket.emit("chatMessage", msg);

//     e.target.elements.msg.value = ''
//     e.target.elements.msg.focus()
// })

// Output msg to dom
// const socket = io(`/${username}`);
const socket = io();

socket.emit("joinRoom", {username, receiver})

socket.on("message", message => {
    outputMessage(message)
    chatMessages.scrollTop = chatMessages.scrollHeight;
})



chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit("chatMessage", msg);

    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()


})





function outputMessage(msg){
    const div = document.createElement("div");
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.username}<span>${msg.time}</span></p>
    <p class="text">${msg.text}</p>`;
    document.querySelector(".chat-messages").appendChild(div);

}