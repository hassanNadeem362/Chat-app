import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo:'',
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    userAction: (state, action) => {
      state.userInfo = action.payload;
    },
  },

});

export const { userAction } = chatSlice.actions;
export default chatSlice.reducer;
