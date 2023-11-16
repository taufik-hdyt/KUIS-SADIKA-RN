import { createSlice } from "@reduxjs/toolkit";

export interface UserStateTypes {
  avatar: string;
  userName: string;
}

const initialState = {
  email: "",
};

export const UserProfile = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { updateProfile } = UserProfile.actions;

export default UserProfile.reducer;
