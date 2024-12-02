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
      console.log("New client connected");

      socket.on("fetchMessages", async (chatSessionId) => {
        try {
          console.log("Fetching messages for chat session:", chatSessionId);

          const chatMessages = await strapi.entityService.findMany(
            "api::message.message",
            {
              filters: {
                chatSession: {
                  id: chatSessionId,
                },
              },
              populate: "*",
            },
          );

          console.log("Found messages:", chatMessages);

          socket.emit("messagesData", chatMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
          socket.emit("messagesData", []);
        }
      });

      socket.on("fetchSessions", async () => {
        console.log("fetch sesssions bakend");

        try {
          const chatSessions = await strapi.entityService.findMany(
            "api::chat-session.chat-session",
            {
              populate: "*",
            },
          );
          socket.emit("sessionsData", chatSessions);
        } catch (err) {}
      });

      socket.on("sendMessage", async (message) => {
        console.log(message);
        if (!message || !message.content) {
          console.log("Invalid message received");
          return;
        }

        const messageData = {
          type: message.type || "text",
          content: message.content,
          sender: message.sender,
          receiver: message.receiver,
          chatSession: message.chatSession,
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
        const createOrJoinRoomData = {
          participants: data.participants,
        };

        try {
          console.log("Saving the chat session data to Strapi");

          const chatSessions = await strapi.entityService.findMany(
            "api::chat-session.chat-session",
            {
              populate: "*",
            },
          );

          console.log("chat sessions");
          console.log(chatSessions);

          // Manual filtering to ensure exactly two participants
          const uniqueParticipantSessions = chatSessions.filter(
            (session) =>
              session.participants.length === 2 &&
              session.participants[0].id ===
                createOrJoinRoomData.participants[0] &&
              session.participants[1].id ===
                createOrJoinRoomData.participants[1],
          );
          console.log("unique participants sessions");
          console.log(uniqueParticipantSessions);

          if (uniqueParticipantSessions.length === 0) {
            // No existing session found, create a new one
            console.log("Creating new chat session");
            const savedChatSession = await strapi.entityService.create(
              "api::chat-session.chat-session",
              {
                data: createOrJoinRoomData,
                populate: "*",
              },
            );
            io.emit("newChatSession", savedChatSession);
          } else {
            // Existing session found
            const existingSession = uniqueParticipantSessions[0];
            io.emit("existingSession", existingSession);
          }
        } catch (error) {
          console.error("Error saving chat session:", error);
          io.emit("chatSessionError", {
            message: "Failed to create or find chat session",
          });
        }
      });
    });
  },
};
