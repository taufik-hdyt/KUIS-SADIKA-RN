import { createSlice } from "@reduxjs/toolkit";

interface QuestionType {
  id: number;
  question: string;
  answer: string;
}

export interface ScoreTypes {
  currentUserScore: number;
  currentUserAnswer: string[];
  questions: QuestionType[];
}

const initialState = {
  currentUserScore: 0,
  currentUserAnswer: [],
  questions: [],
} as ScoreTypes;

export const Score = createSlice({
  name: "time",
  initialState: initialState,
  reducers: {
    setScore: (state, action) => {
      state.currentUserScore = state.currentUserScore + action.payload;
    },
    setAnswer: (state, action) => {
      state.currentUserAnswer = [...state.currentUserAnswer, action.payload];
    },
    setQuestion: (state, action) => {
      state.questions = action.payload;
    },
    resetScoreState: () => initialState,
  },
});

export const { setAnswer, setScore, resetScoreState, setQuestion } = Score.actions;

export default Score.reducer;
