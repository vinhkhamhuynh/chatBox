const chatForm= document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages');

const socket = io();

//get message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  //scroll down
  chatMessage.scrollTop = chatMessage.scrollHeight;
});

//message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get message from html
  const msg = e.target.elements.msg.value;
  console.log(`from server to client ${msg}`);

  //emit(send) message to server
  socket.emit('chatMessage', msg);

  //clear input and focus to txtbox
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
})

//output message to dom
function outputMessage(message){
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild (div);

}