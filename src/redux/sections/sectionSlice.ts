import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { sections: [], fetched: 0 };

export const sectionSlice = createSlice({
	name: "sections",
	initialState,
	reducers: {
		set: (state, action) => {
			return action.payload;
		},
		clear: (state) => {
			return initialState;
		},
	},
});

export const selectAllSections = (state: RootState) => state.sections;
export const { set, clear } = sectionSlice.actions;
export default sectionSlice.reducer;
