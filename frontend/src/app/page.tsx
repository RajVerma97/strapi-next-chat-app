"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { useLogout } from "@/hooks/use-logout";
import useFetchStrapiUsers from "@/hooks/use-fetch-users";
import socket from "@/socket-io";
import { ChatSession } from "@/types/chat-session";
import { User } from "@/types/login-user";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: strapiUsers } = useFetchStrapiUsers();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useUser();
  const { logout } = useLogout();

  const usersWithoutCurrentUser = strapiUsers?.filter(
    (strapiUser: User) => strapiUser.id !== currentUser?.id
  );

  useEffect(() => {
    if (!currentUser) return;

    const handleNewChatSession = (newSession: ChatSession) => {
      setChatSessions((prev) => [...prev, newSession]);
      router.push(`/chat/${newSession.id}`);
    };

    const handleExistingSession = (existingSession: ChatSession) => {
      router.push(`/chat/${existingSession.id}`);
    };

    const handleChatSessionError = (errorData: { message: string }) => {
      setError(errorData.message);
      console.error("Chat Session Error:", errorData.message);
    };

    const handleFetchedSessions = (sessions: ChatSession[]) => {
      setChatSessions(sessions);
    };

    socket.on("newChatSession", handleNewChatSession);
    socket.on("existingSession", handleExistingSession);
    socket.on("chatSessionError", handleChatSessionError);
    socket.on("fetchedSessions", handleFetchedSessions);
    // socket.on("roomJoined", handleRoomJoined);

    socket.emit("fetchSessions", { userId: currentUser.id });

    return () => {
      socket.off("newChatSession", handleNewChatSession);
      socket.off("existingSession", handleExistingSession);
      socket.off("chatSessionError", handleChatSessionError);
      socket.off("fetchedSessions", handleFetchedSessions);
      // socket.off("roomJoined", handleRoomJoined);
    };
  }, [currentUser, router]);

  const handleJoinOrCreateRoom = async (targetId: number) => {
    if (!currentUser) {
      setError("Please log in to start a chat");
      return;
    }

    const isExistingSession = chatSessions?.some((session) =>
      session.participants.some((p) => p.id === targetId)
    );

    if (isExistingSession) {
      const existingSession = chatSessions.find((session) =>
        session.participants.some((p) => p.id === targetId)
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
      const newSessionParticipants = [currentUser.id, targetId];

      socket.emit("createOrJoinRoom", {
        participants: newSessionParticipants,
      });
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800">
        <p>{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-gradient-to-r from-purple-400 to-indigo-400 text-black ">
      <div className="bg-white p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Chat Application</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Existing Chats</h2>
          {chatSessions.length === 0 ? (
            <p className="text-gray-500">No existing chat sessions</p>
          ) : (
            <div className="space-y-2">
              {chatSessions.map((session) => (
                <div key={session.id} className="bg-gray-100 rounded">
                  <button
                    onClick={() =>
                      handleJoinOrCreateRoom(
                        session.participants.find(
                          (p) => p.id !== currentUser?.id
                        )?.id ?? 0
                      )
                    }
                    className="w-full text-left p-2 hover:bg-gray-200 rounded transition"
                  >
                    Chat with{" "}
                    {
                      session.participants.find((p) => p.id !== currentUser?.id)
                        ?.username
                    }
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Start New Chat</h2>
          {usersWithoutCurrentUser?.length === 0 ? (
            <p className="text-gray-500">No other users available</p>
          ) : (
            <div className="space-y-2">
              {usersWithoutCurrentUser?.map((user: User) => (
                <div key={user.id} className="bg-gray-100 rounded">
                  <button
                    onClick={() => handleJoinOrCreateRoom(user.id)}
                    className="w-full text-left p-2 hover:bg-gray-200 rounded transition"
                  >
                    Start Chat with {user.username}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          {currentUser ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
              <p className="mb-1">Username: {currentUser.username}</p>
              <p className="mb-4">Email: {currentUser.email}</p>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <a
                href="/login"
                className="block w-full px-4 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Login
              </a>
              <a
                href="/register"
                className="block w-full px-4 py-2 text-center bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
