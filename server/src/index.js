"use strict";

const { connect } = require("http2");

module.exports = {
  bootstrap() {
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: [
          "https://strapi-next-chat-app.vercel.app",
          "http://localhost:3000",
        ],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on("connection", function (socket) {
      socket.on("createRoom", async (data) => {
        try {
          const { participants } = data;

          if (participants.length !== 2) {
            socket.emit("chatSessionError", {
              message: "Invalid number of participants",
            });
            return;
          }

          const existingChatSessions = await strapi.entityService.findMany(
            "api::chat-session.chat-session",
            {
              populate: { participants: true },
            },
          );

          const matchingSessions = existingChatSessions.filter(
            (session) =>
              session.participants.length === 2 &&
              session.participants.every((p) => participants.includes(p.id)),
          );

          if (matchingSessions.length > 0) {
            socket.emit("existingSession", matchingSessions[0]);
            return;
          }

          const newSession = await strapi.entityService.create(
            "api::chat-session.chat-session",
            {
              data: { participants },
              populate: { participants: true },
            },
          );

          socket.emit("newChatSession", newSession);
        } catch (error) {
          socket.emit("chatSessionError", {
            message: "Failed to create or join room",
            error: error.toString(),
          });
        }
      });

      socket.on("fetchMessages", async (chatSessionId) => {
        try {
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

          socket.emit("fetchedMessages", chatMessages);
        } catch (error) {
          socket.emit("fetchedMessages", []);
        }
      });

      socket.on("fetchSessions", async () => {
        try {
          const chatSessions = await strapi.entityService.findMany(
            "api::chat-session.chat-session",
            {
              populate: "*",
            },
          );
          socket.emit("fetchedSessions", chatSessions);
        } catch (err) {}
      });

      socket.on("sendMessage", async (message) => {
        if (!message.chatSession) {
          return;
        }
        if (!message || !message.content) {
          throw new Error("invalid message");
          return;
        }

        try {
          const chatSession = await strapi.entityService.findOne(
            "api::chat-session.chat-session",
            message.chatSession,
            {
              populate: {},
            },
          );

          if (!chatSession) {
            console.error(
              `Chat session with ID ${message.chatSession} not found`,
            );
            throw new Error("Chat session does not exist");
          }

          const messageData = {
            type: message.type || "text",
            content: message.content,
            sender: message.sender,
            receiver: message.receiver,
            chatSession: { connect: [{ id: message.chatSession }] },
          };

          const savedMessage = await strapi.entityService.create(
            "api::message.message",
            {
              data: messageData,
              populate: { chatSession: true },
            },
          );

          socket.emit("newMessage", savedMessage);
        } catch (error) {
          throw error;
        }
      });
    });
  },
};
