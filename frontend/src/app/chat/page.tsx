"use client";
import React, { Suspense } from "react";
import ChatScreenContent from "../../../components/ChatScreenContent";
import { useSearchParams } from "next/navigation";

// Create a wrapper component to handle search params
function ChatScreenWrapper() {
  const searchParams = useSearchParams();

  const chatSessionId = searchParams.get("chatSessionId") || "";
  const receiverName = searchParams.get("receiverName") || "";

  return (
    <ChatScreenContent
      chatSessionId={chatSessionId}
      receiverName={receiverName}
    />
  );
}

// Main page component that uses Suspense
export default function ChatScreen() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatScreenWrapper />
    </Suspense>
  );
}
