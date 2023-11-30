import { createSlice } from "@reduxjs/toolkit";

type FinalResultsAnswerType = {
  answer: string;
};

type FinalResultType = {
  answers: FinalResultsAnswerType[];
  score: number;
  userAvatar: string;
  userId: string;
  userName: string;
};

const initialState = [] as FinalResultType[];

export const finalResult = createSlice({
  name: "finalResult",
  initialState: initialState,
  reducers: {
    setFinalResult: (state, action) => {
      state = action.payload;
    },
    resetFinalResultState: () => initialState,
  },
});

export const { resetFinalResultState } = finalResult.actions;

export default finalResult.reducer;
