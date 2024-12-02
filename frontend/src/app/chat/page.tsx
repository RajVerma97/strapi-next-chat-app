"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/use-user";
import socket from "@/socket-io";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatScreen({ params }) {
  console.log(params);
  // const searchParams = useSearchParams();
  // const chatSessionId = searchParams.get("id");

  // const [data, setData] = useState<ChatMessage[]>([]);
  // const [message, setMessage] = useState("");
  // const currentUser = useUser();

  // useEffect(() => {
  //   console.log("insdie the useefeefect");

  //   socket.emit("fetchMessages", chatSessionId);

  //   socket.on("messagesData", (messages: ChatMessage[]) => {
  //     console.log("Received messages:", messages);
  //     setData(messages);
  //   });

  //   return () => {
  //     socket.off("messagesData");
  //   };
  // }, [chatSessionId]);

  // useEffect(() => {
  //   socket.on("newMessage", (incomingMessage: ChatMessage) => {
  //     console.log("Client: New message received", incomingMessage);
  //     setData((prev) => [...prev, incomingMessage]);
  //   });

  //   return () => {
  //     socket.off("newMessage");
  //     socket.off("messagesData");
  //   };
  // }, [chatSessionId]);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (!message.trim()) return;
  //   if (!currentUser) {
  //     console.error("User is not logged in");
  //     return;
  //   }

  //   if (!chatSessionId) {
  //     console.log("no chat session id");
  //     return;
  //   }

  //   const messageData: ChatMessage = {
  //     type: "text",
  //     content: message,
  //     sender: currentUser.id,
  //     receiver: currentUser.id,
  //     chatSession: Number(chatSessionId),
  //   };

  //   socket.emit("sendMessage", messageData);
  //   setMessage("");
  // };

  return (
    <></>
    // <div>
    //   chat screen of {chatSessionId}
    //   {currentUser ? (
    //     <form onSubmit={handleSubmit} className="mb-4">
    //       <label htmlFor="message" className="block mb-2 text-sm font-medium">
    //         Message
    //       </label>
    //       <Input
    //         type="text"
    //         name="message"
    //         placeholder="Type your message"
    //         className="w-full p-2 border border-gray-300 rounded-md text-black"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //       />
    //       <Button
    //         variant={"secondary"}
    //         type="submit"
    //         className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    //       >
    //         Send Message
    //       </Button>
    //     </form>
    //   ) : (
    //     <p className="text-red-500">Login to send messages.</p>
    //   )}
    //   <h2 className="text-lg font-semibold">Chat Messages</h2>
    //   <div className="mt-4">
    //     {data.length === 0 ? (
    //       <div>No messages</div>
    //     ) : (
    //       data?.map((msg, index) => (
    //         <div key={`${msg.sender}-${index}`} className="mb-2">
    //           <span className="font-bold">{}</span>: {msg.content}
    //         </div>
    //       ))
    //     )}
    //   </div>
    // </div>
  );
}
