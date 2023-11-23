import { createSlice } from "@reduxjs/toolkit";

export interface TimerTypes {
  timer: number | null;
  status: "idle" | "matchmaking" | "playing" | "finished";
  correctAnswer: boolean | null;
  goNext: boolean;
  goNextQuestion: boolean;
}

const initialState = {
  timer: null,
  status: "idle",
  correctAnswer: null,
  goNext: false,
  goNextQuestion: false,
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
        state.goNext = false;
      } else if (state.status === "matchmaking") {
        state.timer = 10;
        state.goNext = false;
      } else if (state.status === "playing") {
        state.goNext = false;
        state.timer = 30;
      }
    },
    setGoNext: (state, action) => {
      state.goNext = action.payload;
    },
    setGoNextQuestion: (state, action) => {
      state.goNext = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setTimer, setStatus, setGoNext, setGoNextQuestion } =
  Time.actions;

export default Time.reducer;
