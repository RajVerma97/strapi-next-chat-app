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

      socket.on("joinRoom", async (data) => {
        try {
          const { sessionId, participants } = data;
          console.log("backend join room");
          console.log(sessionId, participants);

          const chatSession = await strapi.entityService.findOne(
            "api::chat-session.chat-session",
            sessionId,
            {
              populate: {
                participants: true,
              },
            },
          );
          console.log("chat session", chatSession);

          if (!chatSession) {
            socket.emit("chatSessionError", {
              message: "Chat session not found",
            });
            return;
          }

          // Verify participants
          const validParticipants = chatSession.participants.map((p) => p.id);
          const isValidParticipants = participants.every((id) =>
            validParticipants.includes(id),
          );

          if (!isValidParticipants) {
            socket.emit("chatSessionError", {
              message: "Invalid participants for this session",
            });
            return;
          }

          // Join the room
          socket.join(sessionId);

          // Optional: Fetch recent messages
          const recentMessages = await strapi.entityService.findMany(
            "api::message.message",
            {
              filters: {
                chatSession: { id: sessionId },
              },
              sort: { createdAt: "desc" },
              limit: 50,
              populate: {
                sender: true,
              },
            },
          );

          // Emit room joined event with recent messages
          socket.emit("roomJoined", {
            sessionId,
            messages: recentMessages,
          });
        } catch (error) {
          console.error("Error joining room:", error);
          socket.emit("chatSessionError", {
            message: "Failed to join room",
            error: error.toString(),
          });
        }
      });

      socket.on("createOrJoinRoom", async (data) => {
        try {
          const { participants } = data;

          // Validate participants
          if (participants.length !== 2) {
            socket.emit("chatSessionError", {
              message: "Invalid number of participants",
            });
            return;
          }

          // Check for existing sessions
          const existingChatSessions = await strapi.entityService.findMany(
            "api::chat-session.chat-session",
            {
              populate: {
                participants: true,
              },
              filters: {
                $and: [
                  {
                    participants: {
                      $containsi: participants[0],
                    },
                  },
                  {
                    participants: {
                      $containsi: participants[1],
                    },
                  },
                ],
              },
            },
          );

          // Filter to ensure exact match
          const duplicateSessions = existingChatSessions.filter(
            (session) =>
              session.participants.length === 2 &&
              session.participants.every((p) => participants.includes(p.id)),
          );

          if (duplicateSessions.length > 0) {
            // Existing session found
            socket.emit("existingSession", duplicateSessions[0]);
            return;
          }

          // Create new chat session
          const newSession = await strapi.entityService.create(
            "api::chat-session.chat-session",
            {
              data: {
                participants: participants,
              },
              populate: {
                participants: true,
              },
            },
          );

          // Emit new session
          socket.emit("newChatSession", newSession);
        } catch (error) {
          console.error("Error creating/joining room:", error);
          socket.emit("chatSessionError", {
            message: "Failed to create or join room",
            error: error.toString(),
          });
        }
      });

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

          socket.emit("fetchedMessages", chatMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
          socket.emit("fetchedMessages", []);
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
          socket.emit("fetchedSessions", chatSessions);
        } catch (err) {}
      });

      socket.on("sendMessage", async (message) => {
        console.log(message);
        if (!message.chatSession) {
          console.error("Invalid chatSession provided:", message.chatSession);
          return;
        }
        if (!message || !message.content) {
          console.log("Invalid message received");
          return;
        }

        console.log("chatSession:", message.chatSession);
        console.log("Type of chatSession:", typeof message.chatSession);

        const messageData = {
          type: message.type || "text",
          content: message.content,
          sender: message.sender,
          receiver: message.receiver,
          chatSession: { id: message.chatSession },
        };
        console.log(typeof messageData.chatSession);

        console.log("messages data");
        console.log(messageData);

        try {
          console.log("Saving the message to Strapi");
          const savedMessage = await strapi.entityService.create(
            "api::message.message",
            {
              data: messageData,
            },
          );
          console.log("saved message");
          console.log(savedMessage);

          // const chatMessage = await strapi.entityService.findOne(
          //   "api::message.message",
          //   {
          //     filters: {
          //       chatSession: {
          //         id: message.chatSession,
          //       },
          //     },
          //     populate: "*",
          //   },
          // );

          io.emit("newMessage", savedMessage);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });
    });
  },
};
