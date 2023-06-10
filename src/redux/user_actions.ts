import { UserType } from "@/types/userTypes";

/*
 * User
 */
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const setSubjects = (list: UserType) => {
	return {
		type: SET_USER,
		payload: list,
	};
};

export const clearSubjects = () => {
	return {
		type: LOGOUT_USER,
	};
};
