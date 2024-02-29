import { createSlice } from "@reduxjs/toolkit";

const userProfile = createSlice({
  name: "user",
  initialState: {
    user: [],
    name: "",
    bIsLogin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      //console.log("Store : ", state.user);
    },
    setName: (state, action) => {
      state.user.userName = action.payload;
      //console.log("update name : ", state.user.userName);
    },
    setLogin: (state, action) => {
      state.bIsLogin = action.payload;
      //console.log(" login : ", state.user.bIsLogin);
    },
  },
});

// function à exporter
export const { setUser, setName, setLogin } = userProfile.actions;

export default userProfile.reducer;
