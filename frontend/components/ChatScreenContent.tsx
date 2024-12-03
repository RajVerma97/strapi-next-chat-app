"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/use-user";
import socket from "@/socket-io";
import React from "react";
import { useEffect, useState } from "react";

interface ChatScreenContentProps {
  chatSessionId: string;
}
export default function ChatScreenContent({
  chatSessionId,
}: //   messages,
ChatScreenContentProps) {
  const [data, setData] = useState<ChatMessage[]>([]);

  const [message, setMessage] = useState("");
  const currentUser = useUser();

  useEffect(() => {
    console.log("insdie the useefeefect");

    return () => {};
  }, [chatSessionId]);

  useEffect(() => {
    socket.on(
      "roomJoined",
      ({
        sessionId,
        messages,
      }: {
        sessionId: string;
        messages: ChatMessage[];
      }) => {
        console.log(`Room joined: ${sessionId}`);
        setData(messages);
      }
    );

    return () => {
      socket.off("roomJoined");
    };
  }, []);

  useEffect(() => {
    socket.on("newMessage", (incomingMessage: ChatMessage) => {
      console.log("Client: New message received", incomingMessage);
      setData((prev) => [...prev, incomingMessage]);
    });

    socket.emit("fetchMessages", chatSessionId);

    socket.on("fetchedMessages", (messages: ChatMessage[]) => {
      console.log("Received messages:", messages);
      setData(messages);
    });

    return () => {
      socket.off("newMessage");
      socket.off("fetchedMessages");
    };
  }, [chatSessionId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim()) return;
    if (!currentUser) {
      console.error("User is not logged in");
      return;
    }

    if (!chatSessionId) {
      console.log("no chat session id");
      return;
    }

    const messageData: ChatMessage = {
      type: "text",
      content: message,
      sender: currentUser.id,
      receiver: currentUser.id,
      chatSession: Number(chatSessionId),
    };
    console.log("messages data");
    console.log(messageData);

    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-indigo-700 text-black">
      <div className="shadow-2xl rounded-xl overflow-hidden bg-white max-w-lg w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Chat Screen
        </h1>
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-3">
          {data.length === 0 ? (
            <div className="text-center text-gray-500 italic">
              No messages yet
            </div>
          ) : (
            data?.map((msg: ChatMessage, index) => (
              <div
                key={`${msg.sender}-${index}`}
                className={`flex ${
                  currentUser?.id !== msg.sender
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <span
                  className={`
                p-3 
                rounded-2xl 
                max-w-[70%] 
                break-words 
                inline-block 
                shadow-sm
                ${
                  currentUser?.id !== msg.sender
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-black"
                }
              `}
                >
                  {msg.content}
                </span>
              </div>
            ))
          )}
        </div>
        {currentUser ? (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex items-center space-x-4"
          >
            <Input
              type="text"
              name="message"
              placeholder="Type your message"
              className="
            flex-grow 
            p-3 
            border-2 
            border-indigo-200 
            rounded-xl 
            focus:outline-none 
            focus:ring-2 
            focus:ring-indigo-500 
            text-gray-700
          "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              className="
            px-6 
            py-3 
            bg-indigo-600 
            text-white 
            rounded-xl 
            hover:bg-indigo-700 
            transition-colors 
            duration-300 
            ease-in-out
          "
            >
              Send
            </Button>
          </form>
        ) : (
          <p className="text-center text-red-500 mt-4">
            Please log in to send messages
          </p>
        )}
      </div>
    </div>
  );
}
