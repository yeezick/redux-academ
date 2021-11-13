import { createSlice } from "@reduxjs/toolkit";
// creating a slice that handles the UI

// controls whether cart should display & which notification should display in app.js

// initial state represents an object and can be accessed like on from reducers

// action is attached to the payload of the dispatch

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

// actions must be a method built into the result of createSlice that gives the component direct access to the reducers
export const uiActions = uiSlice.actions;
export default uiSlice;
