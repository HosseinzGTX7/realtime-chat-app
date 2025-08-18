const socket = io()
const clientsTotal = document.getElementById('clients-total')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e) => {
    //safhe refresh nshe
    e.preventDefault()
    sendMessage()
})
socket.on('client-total', (data) => {

    console.log('data')
    clientsTotal.innerText = `total clients : ${data}`

})

function sendMessage(){
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dataTime: new Date()
    }
    socket.emit('message', data)
}

socket.on('chat-message', (data) => {
    console.log(data.message)
})