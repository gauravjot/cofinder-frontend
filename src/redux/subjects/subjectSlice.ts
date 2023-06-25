import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { subjects: [], fetched: 0 };

export const subjectSlice = createSlice({
	name: "subjects",
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

export const selectAllSubjects = (state: RootState) => state.subjects;
export const { set, clear } = subjectSlice.actions;
export default subjectSlice.reducer;
