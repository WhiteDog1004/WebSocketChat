'use strict'

const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendBtn = document.querySelector('.send-btn');
const displayContainer = document.querySelector('.display-container');

// 엔터 이벤트
chatInput.addEventListener('keypress', (event) => {
    if(event.keyCode === 13) {
        send();
        chatInput.value = '';
    }
})

// 전송 버튼 이벤트
function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit('chatting', param);
}
sendBtn.addEventListener('click', send);
    

socket.on('chatting', (data) => {
    const { name, msg, time} = data;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
})

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        let num = 0;
        const li = document.createElement('li');
        li.classList.add(nickname.value === this.name ? "sent" : "received");
        if(nickname.value !== this.name) num = 1;
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img src="./imgs/img0${num}.png" alt="cat">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    }
}