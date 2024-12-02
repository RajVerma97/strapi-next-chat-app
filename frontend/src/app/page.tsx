"use client";

import useFetchStrapiUsers from "@/hooks/use-fetch-users";
import { useLogout } from "@/hooks/use-logout";
import { useUser } from "@/hooks/use-user";
import socket from "@/socket-io";
import { ChatSession } from "@/types/chat-session";
import { User } from "@/types/login-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { data: strapiUsers } = useFetchStrapiUsers();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

  console.log("chat session");
  console.log(chatSessions);
  const currentUser = useUser();

  const usersWithoutCurrentUser = strapiUsers?.filter(
    (strapiUser: User) => strapiUser.id !== currentUser?.id
  );

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    socket.on("newChatSession", (newSession) => {
      setChatSessions((prev) => [...prev, newSession]);
      router.push(`/chat/${newSession.id}`);
    });

    socket.on("existingSession", (existingSession) => {
      router.push(`/chat/${existingSession.id}`);
    });

    return () => {
      socket.off("newChatSession");
      socket.off("existingSession");
    };
  }, [router]);

  const handleJoinOrCreateRoom = async (targetId: number) => {
    if (!currentUser) {
      return;
    }
    // Determine if it's an existing session or a new user
    const isExistingSession = chatSessions?.some(
      (session) => session.id === targetId
    );

    if (isExistingSession) {
      // If it's an existing session, join that specific session
      const existingSession = chatSessions.find(
        (session) => session.id === targetId
      );

      if (existingSession) {
        socket.emit("joinRoom", {
          sessionId: existingSession.id,
          participants: existingSession.participants.map((p) => p.id),
        });
        router.push(`/chat/${existingSession.id}`);
        return;
      }
    } else {
      // If it's a new user, create a new session
      const newSessionParticipants = [currentUser.id, targetId];

      socket.emit("createOrJoinRoom", {
        participants: newSessionParticipants,
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Chat Application 3</h1>

      <h1>List of users</h1>

      {chatSessions?.map((session: ChatSession) => (
        <div key={session.id}>
          <button
            onClick={() => handleJoinOrCreateRoom(session.id)}
            className="w-full text-left p-2 hover:bg-gray-100"
          >
            Chat with{" "}
            {
              session?.participants.find((p) => p.id !== currentUser?.id)
                ?.username
            }
          </button>
        </div>
      ))}

      <h1>New Users</h1>
      {usersWithoutCurrentUser?.map((user: User) => (
        <div key={user.id}>
          <button
            onClick={() => handleJoinOrCreateRoom(user.id)}
            className="w-full text-left p-2 hover:bg-gray-100"
          >
            Start Chat with {user.username}
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
