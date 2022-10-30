import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: { isAuthenticated: false, user: {} },
  error: { message: null },
  polls: [],
  currentPoll: {
    _id: "635e0342ba665673c59ed35b",
    options: [],
    question: "Which is the best JavaScript framework?",
  },
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addError(state, action) {
      state.error.message = action.payload;
    },
    removeError(state) {
      state.error.message = null;
    },
    setCurrentUser(state, action) {
      state.auth = {
        user: action.payload,
        isAuthenticated: !!Object.keys(action.payload).length,
      };
    },
    setPolls(state, action) {
      state.polls = action.payload;
    },
    setCurrentPoll(state, action) {
      state.currentPoll = action.payload;
    },
  },
});

export const selectError = (state) => state.root.error;
export const selectAuth = (state) => state.root.auth;

export const {
  addError,
  removeError,
  setCurrentPoll,
  setCurrentUser,
  setPolls,
} = rootSlice.actions;
export default rootSlice.reducer;
