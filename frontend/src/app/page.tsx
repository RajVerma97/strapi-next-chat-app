"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetchChatSessions from "@/hooks/use-fetch-chat-sessions";
import useFetchStrapiUsers from "@/hooks/use-fetch-users";
import { useLogout } from "@/hooks/use-logout";
import { useUser } from "@/hooks/use-user";
import socket from "@/socket-io";
import { createOrJoinRoomData } from "@/types/create-or-join-room";
import { User } from "@/types/login-user";
import { useEffect, useState } from "react";

type ChatMessage = {
  type: string;
  content: string;
  sender: number;
  receiver: number;
};

export default function Home() {
  const [data, setData] = useState<ChatMessage[]>([]);
  const { data: strapiUsers } = useFetchStrapiUsers();
  const { data: chatSessions } = useFetchChatSessions();
  console.log("chat session");
  console.log(chatSessions);
  const currentUser = useUser();

  const usersWithoutCurrentUser = strapiUsers?.filter(
    (strapiUser: User) => strapiUser.id !== currentUser?.id
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("newMessage", (incomingMessage: ChatMessage) => {
      setData((prev) => [...prev, incomingMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim()) return;
    if (!currentUser) {
      console.error("User is not logged in");
      return;
    }

    const messageData: ChatMessage = {
      type: "text",
      content: message,
      sender: currentUser.id,
      receiver: currentUser.id,
    };

    socket.emit("sendMessage", messageData);
    setMessage("");
  };
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  // const joinOrCrepateRoomMutation = useJoinOrCreateRoomMutation({
  //   onSuccess: (data) => {
  //     console.log("success", data);
  //   },
  //   onError: (error: AxiosError<ErrorResponse>) => {
  //     console.log("error", error);
  //   },
  // });

  const handleJoinOrCreateRoom = (receiverId: number) => {
    if (!currentUser) {
      console.error("Current user is not logged in.");
      return;
    }

    const createOrJoinRoomData: createOrJoinRoomData = {
      participants: [currentUser.id, receiverId],
    };

    socket.emit("createOrJoinRoom", createOrJoinRoomData);
    // setMessage("");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Chat Application 3</h1>

      <h1>List of users</h1>

      {usersWithoutCurrentUser?.map((user: User) => (
        <div key={user.id}>
          <button onClick={() => handleJoinOrCreateRoom(user.id)}>
            {user?.username}
          </button>
        </div>
      ))}

      <div className="my-4">
        {currentUser ? (
          <div>
            <p>Username: {currentUser.username}</p>
            <p>Email: {currentUser.email}</p>

            <button onClick={handleLogout}>logout</button>
          </div>
        ) : (
          <div>
            <a href="/login">login</a>
            <br />
            <a href="/register">register</a>
          </div>
        )}
      </div>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="message" className="block mb-2 text-sm font-medium">
            Message
          </label>
          <Input
            type="text"
            name="message"
            placeholder="Type your message"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant={"secondary"}
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send Message
          </Button>
        </form>
      ) : (
        <p className="text-red-500">Login to send messages.</p>
      )}

      <h2 className="text-lg font-semibold">Chat Messages</h2>
      <div className="mt-4">
        {data.length > 0 ? (
          data.map((msg, index) => (
            <div key={`${msg.sender}-${index}`} className="mb-2">
              <span className="font-bold">{msg.sender}</span>: {msg.content}
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  );
}

// import React, { useState, useEffect, useRef } from "react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const ChatInterface = ({ user, socket }) => {
//   const [messages, setMessages] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [sessions, setSessions] = useState([]);
//   const [currentSession, setCurrentSession] = useState(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     // Fetch user's chat sessions from Strapi
//     const fetchSessions = async () => {
//       try {
//         // Replace with your actual Strapi API call
//         const response = await fetch(`/api/chat-sessions?user=${user.id}`);
//         const data = await response.json();
//         setSessions(data);
//       } catch (error) {
//         console.error("Failed to fetch sessions", error);
//       }
//     };

//     // WebSocket message handling
//     const handleSocketMessage = (event) => {
//       const message = JSON.parse(event.data);
//       setMessages((prev) => [...prev, message]);
//     };

//     if (socket) {
//       socket.addEventListener("message", handleSocketMessage);
//     }

//     fetchSessions();

//     return () => {
//       if (socket) {
//         socket.removeEventListener("message", handleSocketMessage);
//       }
//     };
//   }, [user, socket]);

//   // Scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (currentMessage.trim() && socket) {
//       const messageData = {
//         content: currentMessage,
//         user: user.id,
//         session: currentSession?.id,
//         timestamp: new Date().toISOString(),
//       };

//       // Send message via WebSocket
//       socket.send(JSON.stringify(messageData));

//       // Save message to Strapi
//       try {
//         await fetch("/api/messages", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(messageData),
//         });
//       } catch (error) {
//         console.error("Failed to save message", error);
//       }

//       setCurrentMessage("");
//     }
//   };

//   const createNewSession = async () => {
//     try {
//       const response = await fetch("/api/chat-sessions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user: user.id,
//           title: `New Session ${sessions.length + 1}`,
//           createdAt: new Date().toISOString(),
//         }),
//       });
//       const newSession = await response.json();
//       setSessions([...sessions, newSession]);
//       setCurrentSession(newSession);
//     } catch (error) {
//       console.error("Failed to create new session", error);
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
//       <div className="flex border-b p-4">
//         <div className="flex-grow">
//           <h2 className="text-xl font-bold">
//             {currentSession ? currentSession.title : "Select a Session"}
//           </h2>
//         </div>
//         <Button variant="outline" onClick={createNewSession}>
//           New Session
//         </Button>
//       </div>

//       <CardContent className="flex-grow overflow-y-auto p-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-2 p-2 rounded ${
//               msg.user === user.id
//                 ? "bg-blue-100 text-right self-end"
//                 : "bg-gray-100 text-left self-start"
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </CardContent>

//       <CardFooter className="border-t p-4">
//         <div className="flex w-full space-x-2">
//           <Input
//             value={currentMessage}
//             onChange={(e) => setCurrentMessage(e.target.value)}
//             placeholder="Type a message..."
//             onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//             className="flex-grow"
//           />
//           <Button onClick={handleSendMessage}>Send</Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ChatInterface;
