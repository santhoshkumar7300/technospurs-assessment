import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersList: [],
};

const { actions, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      state.usersList = action.payload;
    },
  },
});

export const { storeUserData } = actions;

export default reducer;
