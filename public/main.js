const socket = io()
const clientsTotal = document.getElementById('clients-total')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
const sendMessageAudio = new Audio('/Sound/COMCell_Message sent (ID 1313)_BSB.mp3')

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
    if(messageInput.value === "") return
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dataTime: new Date()
    }
    socket.emit('message', data)
    addMsgToUI(true, data)
    sendMessageAudio.play()
}

socket.on('chat-message', (data) => {
    console.log(data.message)
    addMsgToUI(false, data)
})

function addMsgToUI(isOwnMessage, data){

    const element =
    `
     <li class="${isOwnMessage ? "message-right" : "message-left"}">
        <p class="message">
            ${data.message}
         </p>
         <span> ${data.name} . ${moment(data.dataTime).fromNow()} </span>
     </li>
    `
    messageContainer.innerHTML += element
    messageInput.value = ""
    scrollToBottom()
}

function scrollToBottom(){

    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}


messageInput.addEventListener('focus', () => {
    socket.emit('feedback', {
        feedback: `${nameInput.value} is typing...`
    })
})
messageInput.addEventListener('keypress', () => {
    socket.emit('feedback', {
        feedback: `${nameInput.value} is typing...`
    })
})
messageInput.addEventListener('blur', () => {
    socket.emit('feedback', {
        feedback: ``
    })

})

socket.on('feedback', (data) => {
    clearFeedback()
    const element = 
    `
    <li class="message-feedback" id="message-feedback">
            <p class="feedback">
                 ${data.feedback}
            </p>
    </li>
    `
    messageContainer.innerHTML += element
    scrollToBottom()
})

function clearFeedback(){

    document.querySelectorAll('li.message-feedback').forEach(element=>{

        element.parentNode.removeChild(element)
    })
}