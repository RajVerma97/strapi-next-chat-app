import { ChatSession } from "./chat-session";

interface ChatMessage {
  type: string;
  content: string;
  sender: number;
  receiver: number;
  chatSession: number;
}

interface ChatMessageDb {
  type: string;
  content: string;
  sender: User;
  receiver: User;
  chatSession: ChatSession;
}
