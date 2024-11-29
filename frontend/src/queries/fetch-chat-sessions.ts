import { NEXT_PUBLIC_STRAPI_API_TOKEN } from "@/contants/constants";
import axios from "axios";

export default async function fetchChatSessions() {
  const response = await axios.get("http://localhost:1337/api/chat-session", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  });
  return response.data;
}
