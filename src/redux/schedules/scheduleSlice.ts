import { MyScheduleTypeItem } from "@/types/stateTypes";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { saveScheduleEP } from "@/server_eps";

const initialState: MyScheduleTypeItem[] = [];

export const scheduleSlice = createSlice({
	name: "mySchedule",
	initialState,
	reducers: {
		set: (_state, action) => {
			return action.payload;
		},
		clear: (_state) => {
			return initialState;
		},
		add: (state, action) => {
			state.push({
				section: action.payload[0].section,
				term: action.payload[0].term,
			});
			let schedulesInTerm = state.filter((s) => s.term === action.payload[0].term);
			let schList: string[] = [];
			for (let i = 0; i < schedulesInTerm.length; i++) {
				schList.push(schedulesInTerm[i].section.toString());
			}
			axios.post(
				saveScheduleEP(action.payload[0].term),
				{
					schedule: schList.join("--"),
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: action.payload[0].userToken,
					},
				}
			);
		},
		remove: (state, action) => {
			return state.filter((entry) => entry.section !== action.payload);
		},
	},
});

export const selectAllSchedules = (state: RootState) => state.mySchedule;
export const { set, clear, add, remove } = scheduleSlice.actions;
export default scheduleSlice.reducer;
