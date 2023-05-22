import React from "react";
import axios from "axios";
import { API_FAIL_RETRY_TIMER, FETCH_TIME_GAP, sectionsEP } from "config";
import { handleApiError } from "services/handle_error";
import { ApiError, FetchState, ResponseType } from "types/apiResponseType";
import { MyScheduleTypeItem, ReduxDetailedScheduleType } from "types/stateTypes";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { RootState } from "index";
import { setDetailedSchedule } from "redux/actions";
import { TermType, SectionsBrowserType } from "types/dbTypes";
import { difference } from "lodash";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchSpecificSections(
	term: string,
	schedule: MyScheduleTypeItem[]
): Promise<ResponseType<SectionsBrowserType[] | ApiError>> {
	return axios
		.get(sectionsEP(term, encodeB64(schedule)))
		.then(function (response) {
			return {
				success: true,
				res: response.data.sections,
			} as ResponseType<SectionsBrowserType[]>;
		})
		.catch(handleApiError);
}

// Encode to base64 to send in URL
function encodeB64(rows: MyScheduleTypeItem[]) {
	let response: number[] = [];
	rows.forEach((row) => {
		response.push(row.section);
	});
	return window.btoa(response.join(","));
}

/*
 *
 */
export function useFetchSpecificSections(ignoreTerm?: false): ReduxDetailedScheduleType {
	const [data, setData] = React.useState<ReduxDetailedScheduleType>({
		fetched: 0,
		sections: [],
	});
	const mySchedule: MyScheduleTypeItem[] = useAppSelector(
		(state: RootState) => state.mySchedule
	);
	const reduxScheduleSections: ReduxDetailedScheduleType = useAppSelector(
		(state: RootState) => state.detailedSchedule
	);
	const currentTerm: TermType = useAppSelector((state: RootState) => state.currentTerm);
	const dispatch = useAppDispatch();
	const TERM_ERROR = "Term information not present.";

	const apiCall = React.useCallback(
		async (term: string, schedule: MyScheduleTypeItem[]) => {
			if (term.length < 8) {
				throw new Error(TERM_ERROR);
			}
			const response = await fetchSpecificSections(term, schedule);

			if (response.success) {
				return {
					fetched: new Date().getTime(),
					sections: response.res as SectionsBrowserType[],
				} as ReduxDetailedScheduleType;
			} else {
				let error = response.res as ApiError;
				throw new Error(error.message);
			}
		},
		[]
	);

	React.useEffect(() => {
		function getData() {
			const pickTermSchedule = mySchedule.filter((row) => {
				return row.term === currentTerm.id;
			});
			if (pickTermSchedule.length < 1) {
				setData({
					fetched: new Date().getTime(),
					sections: [],
				});
				return;
			}
			// Check if schedules saved locally is outdated
			// i.e. enteries are removed or added since then
			let list1: number[] = [];
			pickTermSchedule.forEach((row) => {
				list1.push(row.section);
			});
			let list2: number[] = [];
			reduxScheduleSections.sections.forEach((row) => {
				list2.push(row.crn);
			});
			/*********/
			if (
				new Date().getTime() - reduxScheduleSections.fetched > FETCH_TIME_GAP ||
				difference(list1, list2).length !== 0
			) {
				// If the local data is stale we need to fetch again
				setData({
					fetched: FetchState.Fetching,
					sections: [],
				});
				apiCall(currentTerm.id, pickTermSchedule)
					.then((response) => {
						setData(response);
					})
					.catch((err: Error) => {
						setData({
							fetched:
								err.message === TERM_ERROR
									? FetchState.Incomplete
									: FetchState.Error,
							sections: [],
						});
					});
			} else {
				// Data is not stale yet, we are good
				setData(reduxScheduleSections);
			}
		}
		async function main() {
			if (reduxScheduleSections.fetched === FetchState.Fetching) {
				return;
			}
			if (reduxScheduleSections.fetched === FetchState.Error) {
				// we wait before retry fetching
				await sleep(API_FAIL_RETRY_TIMER).then(getData);
			} else {
				getData();
			}
		}
		main();
	}, [apiCall, reduxScheduleSections, mySchedule, currentTerm.id, dispatch]);

	React.useEffect(() => {
		if (data.fetched === 0) {
			return;
		}
		console.log("updating local storage...");
		dispatch(setDetailedSchedule(data));
	}, [data, dispatch]);

	return data;
}