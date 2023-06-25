import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = { terms: [], fetched: 0 };

export const termSlice = createSlice({
	name: "terms",
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

export const selectAllTerms = (state: RootState) => state.terms;
export const { set, clear } = termSlice.actions;
export default termSlice.reducer;
