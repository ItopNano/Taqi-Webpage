

var dictionary = {
  "hello": "Hi there!",
  "how are you": "I'm just a bot, but I'm doing fine!",
  "bye": "Goodbye! Have a nice day!",
  "help": "You can say 'hello', 'how are you', or 'bye'."
};

var chatbox = document.getElementById("chatbox");
var input = document.getElementById("inp_ms");
var button = document.getElementById("sendBtn");

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.innerText = text;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(message) {
  message = message.toLowerCase();
  for (let key in dictionary) {
    if (message.includes(key)) {
      return dictionary[key];
    }
  }
  return "Sorry, I didn't understand that.";
}

function reply(message) {
  const botReply = getBotResponse(message);
  addMessage("bot", botReply);
  speak(botReply);
}

function speak(text) {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

function delayedSend() {
  const userText = input.value.trim();
  if (userText !== "") {
    addMessage("user", userText);
    input.value = "";
    setTimeout(() => reply(userText), 500);
  }
}

button.addEventListener("click", delayedSend);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") delayedSend();
});


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function startRec() {
  recognition.start();
}

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  input.value = transcript;
  delayedSend();
};

recognition.onend = function () {
  input.focus();
};

recognition.onerror = function (event) {
  console.error("Speech recognition error:", event.error);
};
