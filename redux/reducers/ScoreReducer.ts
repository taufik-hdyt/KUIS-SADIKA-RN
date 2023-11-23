import { createSlice } from "@reduxjs/toolkit";

export interface ScoreTypes {
  score: number;
  answer: string[];
}

const initialState = {
  score: 0,
  answer: [],
} as ScoreTypes;

export const Score = createSlice({
  name: "time",
  initialState: initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = state.score + action.payload;
    },
    setAnswer: (state, action) => {
      state.answer = [...state.answer, action.payload];
    },
    resetScoreState: () => initialState,
  },
});

export const { setAnswer, setScore, resetScoreState } = Score.actions;

export default Score.reducer;
