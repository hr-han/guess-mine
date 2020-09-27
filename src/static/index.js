// eslint-disable-next-line no-undef
const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You: ${message}`);
}

function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}

function handleMessageNoti(data) {
  const { message, nickname } = data;
  console.log(`${nickname} said ${message}`);
}

socket.on("messageNotification", handleMessageNoti);
