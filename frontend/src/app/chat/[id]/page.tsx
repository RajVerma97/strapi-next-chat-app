"use client";
import React from "react";
import { Suspense } from "react";
import ChatScreenContent from "../../../../components/ChatScreenContent";

export default function ChatScreen({ params }: { params: { id: string } }) {
  const { id: chatSessionId } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatScreenContent chatSessionId={chatSessionId} />
    </Suspense>
  );
}
