import { createSlice } from "@reduxjs/toolkit";

export interface TimerTypes {
  timer: number | null;
  status: "idle" | "matchmaking" | "playing" | "finished";
  correctAnswer: boolean | null;
  shouldTick: boolean;
}

const initialState = {
  timer: null,
  status: "idle",
  correctAnswer: null,
} as TimerTypes;

export const Time = createSlice({
  name: "time",
  initialState: initialState,
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      if (state.status === "idle" || state.status === "finished") {
        state.timer = null;
      } else if (state.status === "matchmaking") {
        state.timer = 6;
      } else if (state.status === "playing") {
        state.timer = 8;
      }
    },
    tick: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },
  },
});

export const { setTimer, setStatus, tick } = Time.actions;

export default Time.reducer;
