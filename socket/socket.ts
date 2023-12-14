import { io } from "socket.io-client";
export const socket = io(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:4000`);
