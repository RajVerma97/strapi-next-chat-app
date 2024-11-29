import { NEXT_PUBLIC_STRAPI_API_TOKEN } from "@/contants/constants";
import { createOrJoinRoomData } from "@/types/create-or-join-room";
import axios from "axios";

export default async function createOrJoinRoom(params: createOrJoinRoomData) {
  const response = await axios.post(
    "http://localhost:1337/chat-sessions",
    params,
    {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    }
  );

  return response.data;
}
