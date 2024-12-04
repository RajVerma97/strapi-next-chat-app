"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/use-user";
import socket from "@/socket-io";
import { ChatMessage, ChatMessageDb } from "@/types/chat-message";
import React from "react";
import { useEffect, useState } from "react";

interface ChatScreenContentProps {
  chatSessionId: string;
  receiverName?: string;
}
export default function ChatScreenContent({
  chatSessionId,
  receiverName,
}: ChatScreenContentProps) {
  const [data, setData] = useState<ChatMessageDb[]>([]);

  const [message, setMessage] = useState("");
  const currentUser = useUser();

  useEffect(() => {
    socket.on("newMessage", (incomingMessage: ChatMessageDb) => {
      setData((prev) => [...prev, incomingMessage]);
    });

    socket.emit("fetchMessages", chatSessionId);

    socket.on("fetchedMessages", (messages: ChatMessageDb[]) => {
      setData(messages);
    });

    return () => {
      socket.off("newMessage");
      socket.off("fetchedMessages");
    };
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim()) return;
    if (!currentUser) {
      throw new Error("user is not logged in ");
      return;
    }

    if (!chatSessionId) {
      throw new Error("no chat session id");
      return;
    }

    const messageData: ChatMessage = {
      type: "text",
      content: message,
      sender: currentUser.id,
      receiver: currentUser.id,
      chatSession: Number(chatSessionId),
    };

    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  return (
    <div className=" p-8 min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-indigo-700 text-black">
      <div className="shadow-2xl rounded-xl overflow-hidden bg-white max-w-lg w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          {receiverName}
        </h1>
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-3">
          {data.length === 0 ? (
            <div className="text-center text-gray-500 italic">
              No messages yet
            </div>
          ) : (
            data?.map((msg: ChatMessageDb, index) => (
              <div
                key={`${msg.sender}-${index}`}
                className={`flex ${
                  currentUser?.id == msg.sender?.id
                    ? "justify-end"
                    : "justify-start"
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
                  currentUser?.id == msg.sender?.id
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
