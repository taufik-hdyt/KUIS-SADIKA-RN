import { UserDataType } from "./userData";

export type RoomUserType = {
  user: UserDataType;
  score: number;
};

export type RoomType = {
  players: RoomUserType[];
  roomId: string;
};

class RoomsData {
  private _rooms: RoomType[];

  constructor() {
    this._rooms = [];
  }

  get activeRooms(): RoomType[] {
    return this._rooms;
  }

  getRoom(roomId: string): RoomType {
    return this._rooms.filter((room) => {
      return room.roomId === roomId;
    })[0];
  }

  addRoom(room: RoomType) {
    this._rooms.push(room);
  }

  deleteRoom(roomId: string) {
    this._rooms = this._rooms.filter((room) => room.roomId !== roomId);
  }

  changeScore(userId: string, roomId: string, score: number) {
    this._rooms = this._rooms.map((room) => {
      if (room.roomId === roomId) {
        return {
          ...room,
          players: room.players.map((user) => {
            if (user.user.userId === userId) {
              return {
                ...user,
                score: user.score + score,
              };
            }
            return user;
          }),
        };
      }
      return room;
    });
  }
}

export default RoomsData;
