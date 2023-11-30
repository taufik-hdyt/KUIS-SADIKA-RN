import { createSlice } from "@reduxjs/toolkit";

export interface PlayersType {
  userId: string;
  userName: string;
  userAvatar: string;
}

interface PlayersArrayType {
  player: PlayersType[];
}

const initialState = {
  player: [],
} as PlayersArrayType;

export const Players = createSlice({
  name: "playersInMM",
  initialState: initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    resetPlayerState: () => initialState,
  },
});

export const { setPlayer, resetPlayerState } = Players.actions;

export default Players.reducer;
