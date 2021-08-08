
const client = io();

const $online = document.querySelector('#online');

client.on('connect-user', ({online}) => {
	$online.textContent = online;
})

client.on('disconnect-user', ({online}) => {
	$online.textContent = online;
})


const	$sendBtn = document.querySelector('#send-btn');

const sendMessage = () => {
	
	const  username = document.querySelector('#username-input').value,
	message = document.querySelector('#message-textarea').value;
	
	if(!username || !message) return;
	
	client.emit('send-message', {username, message});
	
};

$sendBtn.addEventListener('click', sendMessage);


const showMessage = (username, message) => {

	const $messageTemplate = document.querySelector('#message-template').content,
		$messagesContainer = document.querySelector('#messages-container');

	$messageTemplate.querySelector('.nameMessage').textContent = username;
	$messageTemplate.querySelector('.message').textContent = message;
	
  let $clone = document.importNode($messageTemplate, true);
	$messagesContainer.prepend($clone);

	$messageTextarea.value = '';
	$messageTextarea.focus();

}

client.on('send-message', ({username, message}) => {
	showMessage(username, message);
})