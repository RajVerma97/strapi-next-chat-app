import fetchChatSessions from "@/queries/fetch-chat-sessions";
import { useQuery } from "@tanstack/react-query";

export default function useFetchChatSessions() {
  return useQuery({
    queryKey: ["fetch-chat-sessions"],
    queryFn: () => fetchChatSessions(),
  });
}
