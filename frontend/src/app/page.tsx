"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { useLogout } from "@/hooks/use-logout";
import useFetchStrapiUsers from "@/hooks/use-fetch-users";
import socket from "@/socket-io";
import { ChatSession } from "@/types/chat-session";
import { User } from "@/types/login-user";
import { useRouter } from "next/navigation";

interface ChatSessionButtonProps {
  session: ChatSession;
  currentUserId: number | undefined;
  onJoinRoom: (targetId: number) => void;
}

function ChatSessionButton({
  session,
  currentUserId,
  onJoinRoom,
}: ChatSessionButtonProps) {
  const otherParticipant = session.participants.find(
    (p) => p.id !== currentUserId
  );

  return (
    <div className="rounded p-2">
      <button
        onClick={() => onJoinRoom(otherParticipant?.id ?? 0)}
        className="w-14 h-14 bg-gray-200 hover:bg-gray-300 rounded-full flex justify-center items-center transition"
      >
        {otherParticipant?.username}
      </button>
    </div>
  );
}

interface ChatUserButtonProps {
  user: User;
  onClick: (targetId: number) => void;
}

function ChatUserButton({ user, onClick }: ChatUserButtonProps) {
  return (
    <button
      key={user.id}
      onClick={() => onClick(user.id)}
      className="w-14 h-14 bg-gray-200 hover:bg-gray-300 rounded-full flex justify-center items-center transition"
    >
      {user.username}
    </button>
  );
}

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

    socket.emit("fetchSessions", { userId: currentUser.id });

    return () => {
      socket.off("newChatSession", handleNewChatSession);
      socket.off("existingSession", handleExistingSession);
      socket.off("chatSessionError", handleChatSessionError);
      socket.off("fetchedSessions", handleFetchedSessions);
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
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-md p-8 bg-red-100 text-red-800 rounded-lg">
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-700 text-black">
      <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Chat Application
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Existing Chats
          </h2>
          {chatSessions.length === 0 ? (
            <p className="text-gray-500 text-center italic">
              No existing chat sessions
            </p>
          ) : (
            <div className="w-full">
              <div className="grid grid-cols-4 justify-between gap-4">
                {chatSessions?.map((session: ChatSession) => (
                  <ChatSessionButton
                    key={session.id}
                    session={session}
                    currentUserId={currentUser?.id}
                    onJoinRoom={handleJoinOrCreateRoom}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-black">
            Start New Chat
          </h2>
          {usersWithoutCurrentUser?.length === 0 ? (
            <p className="text-gray-500 text-center italic">
              No other users available
            </p>
          ) : (
            <div className="w-full">
              <div className="grid grid-cols-4 justify-between gap-4">
                {usersWithoutCurrentUser?.map((user: User) => (
                  <ChatUserButton
                    key={user.id}
                    user={user}
                    onClick={handleJoinOrCreateRoom}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="mt-6">
          {currentUser ? (
            <div className="bg-indigo-50 p-4 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-black">
                Your Profile
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Username:</span>{" "}
                  {currentUser.username}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">Email:</span>{" "}
                  {currentUser.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300 ease-in-out shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <a
                href="/login"
                className="block w-full px-4 py-3 text-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow-md"
              >
                Login
              </a>
              <a
                href="/register"
                className="block w-full px-4 py-3 text-center bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300 ease-in-out shadow-md"
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
