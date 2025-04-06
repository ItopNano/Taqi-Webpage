
// var chatbox = document.getElementById('chatbox');
// var inp_ms = document.getElementById("inp_ms");

// function btn(){

//     var ms = document.createElement('p');
//     text = "You: "+inp_ms.value;
//     ms.innerHTML = text;
//     ms.style.textAlign = "right";
//     chatbox.appendChild(ms);
//     reply(inp_ms.value);

// }

// function reply(msg){
//     console.log(msg);
//     msg = msg.toLowerCase();

//     if(msg.includes("hello") || msg.includes("hi")){
//         var ms = document.createElement('p');
//         text = "Picaso: Hello";
//         ms.innerHTML = text;
//         ms.style.textAlign = "left";
//         chatbox.appendChild(ms);
//     }
// }



var dictionary = {
    "hello": "Hi there! 👋",
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

button.addEventListener("click", () => {
    const userText = input.value.trim();
    if (userText) {
      addMessage("user", userText);
      const botReply = getBotResponse(userText);
      setTimeout(() => addMessage("bot", botReply), 300); // Bot replies after a short delay
      input.value = "";
    }
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") button.click();
});