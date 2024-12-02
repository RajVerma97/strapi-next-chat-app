interface ChatMessage {
  type: string;
  content: string;
  sender: number;
  receiver: number;
  chatSession: ChatSession;
}
