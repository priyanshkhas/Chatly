import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers: null,
    selectedUser:null,
    socket: null,
    onlineUsers: null,
    searchData: null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    }
  }
});

// ✅ Export BOTH actions
export const { setUserData, setOtherUsers, setSelectedUser, setSocket, setOnlineUsers, setSearchData } = userSlice.actions;

// ✅ Export reducer
export default userSlice.reducer;

