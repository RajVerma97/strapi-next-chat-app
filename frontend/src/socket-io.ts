import { io } from "socket.io-client";
import { NEXT_PUBLIC_BACKEND } from "./contants/constants";

const socket = io(`${NEXT_PUBLIC_BACKEND}`, {
  transports: ["websocket", "polling"],
  withCredentials: true,
  path: "/socket.io/",
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  secure: true,
});

export default socket;
