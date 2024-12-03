"use client";
import React, { use } from "react";
import { Suspense } from "react";
import ChatScreenContent from "../../../../components/ChatScreenContent";

export default function ChatScreen({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: chatSessionId } = use(params);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatScreenContent chatSessionId={chatSessionId} />
    </Suspense>
  );
}
