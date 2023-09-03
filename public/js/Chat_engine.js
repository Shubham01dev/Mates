class ChatEngine {
  constructor(chatBox, userEmail) {
    this.chatBox = $(`.${chatBox}`);
    this.userEmail = userEmail;

    this.socket = io.connect("http://localhost:5000");

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;
    this.socket.on("connect", function () {
      console.log("connection has been established using scoket");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: "Socialwebapp",
      });

      self.socket.on("user_joined", function (data) {
        console.log("new user joined", data);
      });

      // Sending the message on clicking the send button
      $("#chat_sender").click(function () {
        let msg = $("#chats").val();
        if (msg != "") {
          self.socket.emit("send_message", {
            message: msg,
            user_email: self.userEmail,
            chatroom: "Socialwebapp",
          });
        }
      });

      self.socket.on("recieve_message", function (data) {
        console.log("message received", data);

        let newMessage = $("#chat_container");

        let messageType = "other-messsage";

        if (data.user_email == self.userEmail) {
          messageType = "self-message";
          newMessage.append(`<div class="user_chat">${data.message}</div>`);
        } else {
          newMessage.append(`<div class="friend_chat">${data.message}</div>`);
        }

        $("Chat-box").append(newMessage);
      });
    });
  }
}
