"use strict";

const { connect } = require("http2");

module.exports = {
  bootstrap() {
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection", function (socket) {
      socket.on("sendMessage", async (message) => {
        // Validate message
        if (!message || !message.content) {
          console.log("Invalid message received");
          return;
        }

        const messageData = {
          type: message.type || "text",
          content: message.content,
          sender: message.sender,
          receiver: message.receiver,
        };

        try {
          console.log("Saving the message to Strapi");
          const savedMessage = await strapi.entityService.create(
            "api::message.message",
            {
              data: messageData,
            },
          );

          io.emit("newMessage", savedMessage);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });

      socket.on("createOrJoinRoom", async (data) => {
        console.log(data);

        const createOrJoinRoomData = {
          participants: data.participants,
        };

        try {
          console.log("Saving the chat session data to Strapi");
          const savedChatSession = await strapi.entityService.create(
            "api::chat-session.chat-session",
            {
              data: createOrJoinRoomData,
            },
          );

          // io.emit("newMessage", savedMessage);
        } catch (error) {
          console.error("Error saving chat session:", error);
        }
      });
    });
  },
};

// socket.on("join", async ({ username }) => {
//   console.log("user joined");
// if (username) {
//   socket.join("group");
//   socket.emit("welcome", {
//     user: "bot",
//     text: `${username}, Welcome to the group chat`,
//     userData: username,
//   });
//   let strapiData = {
//     data: {
//       users: username,
//       socketid: socket.id,
//     },
//   };
//   await axios
//     .post("http://localhost:1337/api/active-users", strapiData)
//     .then(async (e) => {
//       socket.emit("roomData", { done: "true" });
//     })
//     .catch((e) => {
//       if (e.message == "Request failed with status code 400") {
//         socket.emit("roomData", { done: "existing" });
//       }
//     });
// } else {
//   console.log("e no work");
// }
// });
// socket.on("sendMessage", async (data) => {
//   let strapiData = {
//     data: {
//       user: data.user,
//       message: data.message,
//     },
//   };
//   var axios = require("axios");
//   await axios
//     .post("http://localhost:1337/api/messages", strapiData)
//     .then((e) => {
//       socket.broadcast.to("group").emit("message", {
//         user: data.username,
//         text: data.message,
//       });
//     })
//     .catch((e) => console.log("error", e.message));
// });
// socket.on("kick", (data) => {
//   io.sockets.sockets.forEach((socket) => {
//     if (socket.id === data.socketid) {
//       socket.disconnect();
//       socket.removeAllListeners();
//       return console.log("kicked", socket.id, data.socketid);
//     } else {
//       console.log("Couldn't kick", socket.id, data.socketid);
//     }
//   });
// });
// });
