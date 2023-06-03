export const sectionsEP = (term: string, encodedCRNs: string | null = null): string => {
	if (encodedCRNs) {
		console.log(process.env.REACT_APP_INSERTION_IDENTIFIER);
		return (
			process.env.REACT_APP_SPECIFIC_SECTION_EP?.replace(
				process.env.REACT_APP_INSERTION_IDENTIFIER || "{}",
				term
			)?.replace(process.env.REACT_APP_INSERTION_IDENTIFIER || "{}", encodedCRNs) ||
			""
		);
	}
	return (
		process.env.REACT_APP_SECTION_EP?.replace(
			process.env.REACT_APP_INSERTION_IDENTIFIER || "{}",
			term
		) || ""
	);
};

export const EP_TERMS: string = process.env.REACT_APP_TERM_EP || "";

export const subjectsEP = (term: string) => {
	return (
		process.env.REACT_APP_SUBJECTS_EP?.replace(
			process.env.REACT_APP_INSERTION_IDENTIFIER || "{}",
			term
		) || ""
	);
};

export const coursesEP = (term: string) => {
	return (
		process.env.REACT_APP_COURSES_EP?.replace(
			process.env.REACT_APP_INSERTION_IDENTIFIER || "{}",
			term
		) || ""
	);
};

export const instructorsEP = (term: string) => {
	return (
		process.env.REACT_APP_INSTRUCTORS_EP?.replace(
			process.env.REACT_APP_INSERTION_IDENTIFIER || "{}",
			term
		) || ""
	);
};

export const seatsEP = (term_name: string | number, crn: string | number) => {
	return (
		process.env.REACT_APP_SEATS_EP?.replace(
			process.env.REACT_APP_INSERTION_IDENTIFIER || "{}",
			term_name.toString()
		)?.replace(process.env.REACT_APP_INSERTION_IDENTIFIER || "{}", crn.toString()) ||
		""
	);
};
