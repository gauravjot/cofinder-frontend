import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = null;

export const userSlice = createSlice({
	name: "subjects",
	initialState,
	reducers: {
		setUser: (state, action) => {
			return action.payload;
		},
		clearUser: (state) => {
			return initialState;
		},
	},
});

export const selectUser = (state: RootState) => state.user;
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
