"use client";
import React from "react";
import { Suspense } from "react";
import ChatScreenContent from "../../../components/ChatScreenContent";
import { useSearchParams } from "next/navigation";

export default function ChatScreen() {
  const searchParams = useSearchParams();

  const chatSessionId = searchParams.get("chatSessionId") || "";
  const receiverName = searchParams.get("receiverName") || "";
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatScreenContent
        chatSessionId={chatSessionId}
        receiverName={receiverName}
      />
    </Suspense>
  );
}
