import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
