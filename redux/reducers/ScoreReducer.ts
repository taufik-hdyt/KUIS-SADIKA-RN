import { createSlice } from "@reduxjs/toolkit";

interface QuestionType {
  id: number;
  question: string;
  answer: string;
}

export interface ScoreTypes {
  currentUserScore: number;
  currentUserAnswer: string;
  questions: QuestionType[];
  roomId: string;
}

const initialState = {
  currentUserScore: 0,
  currentUserAnswer: "",
  questions: [],
  roomId: "",
} as ScoreTypes;

export const Score = createSlice({
  name: "time",
  initialState: initialState,
  reducers: {
    setScore: (state, action) => {
      state.currentUserScore = state.currentUserScore + action.payload;
    },
    setAnswer: (state, action) => {
      state.currentUserAnswer = action.payload;
    },
    setQuestion: (state, action) => {
      state.questions = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    resetScoreState: () => initialState,
  },
});

export const { setAnswer, setScore, resetScoreState, setQuestion, setRoomId } =
  Score.actions;

export default Score.reducer;
