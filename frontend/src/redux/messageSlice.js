import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages:[]
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    }
  }
});

// ✅ Export BOTH actions
export const { setMessages } = messageSlice.actions;

// ✅ Export reducer
export default messageSlice.reducer;