// Retrieve messages from local storage if available
let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
let deletePassword = localStorage.getItem('deletePassword');

// Display existing messages
const chatMessages = document.getElementById('chat-messages');
function displayMessages() {
  chatMessages.innerHTML = '';
  messages.forEach((message, index) => {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `
      <div class="message-content">${message}</div>
      <div class="message-delete-btn" onclick="deleteMessage(${index})">&#10060;</div>
    `;
    chatMessages.appendChild(messageElement);
  });
}
displayMessages();

// Send message form submit event
const messageForm = document.getElementById('message-form');
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const newMessage = messageInput.value;

  if (newMessage.trim() !== '') {
    // Add new message to the chat
    messages.push(newMessage);
    localStorage.setItem('chatMessages', JSON.stringify(messages));

    // Clear the input field
    messageInput.value = '';

    // Display updated messages
    displayMessages();
  }
});

// Delete a message
function deleteMessage(index) {
  const password = prompt('Please enter the password:');
  if (password === deletePassword) {
    messages.splice(index, 1);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    displayMessages();
  } else {
    alert('Incorrect password!');
  }
}
