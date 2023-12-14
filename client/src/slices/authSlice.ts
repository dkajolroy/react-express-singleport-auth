import { createSlice } from "@reduxjs/toolkit";

interface Init {
  user: User | null;
  isLoading: boolean;
  isError: String | null;
}
const initialState: Init = {
  user: null,
  isLoading: false,
  isError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess(state, action: { payload: User | null }) {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { signInSuccess } = authSlice.actions;
