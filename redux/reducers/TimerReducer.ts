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
  shouldTick: false,
} as TimerTypes;

let timerId;

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
    startTimer: (state) => {
      if (timerId) {
        clearInterval(timerId);
      }
      timerId = setInterval(() => {
        // You can't dispatch an action here because `dispatch` is not available.
        // Instead, you can set a flag in your state to indicate that the timer should tick.
        state.shouldTick = true;
      }, 1000);
    },
    stopTimer: (state) => {
      clearInterval(timerId);
      state.shouldTick = false;
    },
    tick: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },
  },
});

export const { setTimer, setStatus, tick, startTimer, stopTimer } =
  Time.actions;

export default Time.reducer;
