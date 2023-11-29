import { Server, Socket } from "socket.io";
import UsersData, { UserDataType } from "../data/userData";
import RoomsData from "../data/roomData";

function createUniqueID(roomOrUser: string) {
  return roomOrUser + Math.random().toString(36).substring(2, 15);
}

const PLAYER_PER_MATCH = 3;
const QUESTION_PER_MATCH = 5;
const usersWaiting = new UsersData();
const rooms = new RoomsData();

let StartTimer: NodeJS.Timeout | undefined = undefined;

interface roomTimeout {
  [key: string]: NodeJS.Timeout | undefined;
}
const roomTimers: roomTimeout = {};

export default function socketController(io: Server, socket: Socket) {
  socket.on("matchmaking", async ({ userId, userName, userAvatar }) => {
    if (!usersWaiting.checkUser(userId)) {
      usersWaiting.addUser({
        userId: createUniqueID("user_"),
        userName,
        userAvatar,
        socket,
      });
      console.log(`New player with ID ${socket.id} joined the matchmaking`);

      userWaitingInfo();
      userWaitingListUpdate();

      if (StartTimer === undefined) {
        let time = 10;
        StartTimer = setInterval(async () => {
          usersWaiting.allUser.forEach((user: UserDataType) => {
            user.socket.emit("findingMatchCountdown", {
              message: `Finding Opponents in ${time} seconds`,
              time,
            });
          });

          if (time === 0) {
            if (StartTimer) clearInterval(StartTimer);
            StartTimer = undefined;
            matchStart();
          }
          time--;
        }, 1000);
      }

      if (usersWaiting.allUser.length >= PLAYER_PER_MATCH) {
        if (StartTimer) clearInterval(StartTimer);
        StartTimer = undefined;

        matchStart();
      }
    }

    socket.on("cancelMatchmaking", () => {
      usersWaiting.removeUser(socket.id);
      console.log(`user ${socket.id} disconnected`);

      if (usersWaiting.allUser.length === 0) {
        if (StartTimer) clearInterval(StartTimer);
        StartTimer = undefined;
      }

      userWaitingInfo();
      userWaitingListUpdate();
    });

    socket.on("disconnect", () => {
      usersWaiting.removeUser(socket.id);
      console.log(`user ${socket.id} disconnected`);

      if (usersWaiting.allUser.length === 0) {
        if (StartTimer) clearInterval(StartTimer);
        StartTimer = undefined;
      }

      userWaitingInfo();
      userWaitingListUpdate();
    });
  });
}

// start finding match log
function userWaitingListUpdate() {
  usersWaiting.allUser.forEach((user: UserDataType) => {
    user.socket.emit("findingMatch", {
      message: "Finding Opponents 😀",
      opponentsInMatchmaking: usersWaiting.allUser.map(
        (user: UserDataType) => ({
          userId: user.userId,
          userName: user.userName,
          userAvatar: user.userAvatar,
        })
      ),
    });
  });
}

// Ongoing matchmaking logs
function userWaitingInfo() {
  console.log(
    "users waiting for match",
    usersWaiting.allUser.map((user) => `${user.userId} - ${user.userName}`)
  );
}

function matchStart() {
  const roomID = createUniqueID("room_");
  console.log("room created", roomID);
  const playerSelectedToMatch = usersWaiting.allUser.splice(
    0,
    PLAYER_PER_MATCH
  );
  rooms.addRoom({
    roomId: roomID,
    players: playerSelectedToMatch.map((player) => ({
      user: player,
      score: 0,
    })),
  });

  playerSelectedToMatch.forEach((user: UserDataType) => {
    user.socket.join(roomID);
    user.socket.emit("matchFound", {
      message: "Match Found",
      roomID,
      questions: [
        {
          question: "are you bing chilling?",
        },
        {
          question: "are you super idol?",
        },
        {
          question: "do you know what happened in tianmen square?",
        },
      ],
    });
  });
}
