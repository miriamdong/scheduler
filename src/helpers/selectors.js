export function getAppointmentsForDay(state, day) {
	if (state.days.length === 0) return [];
	// if (state.days.name === day) return day;
	// console.log(state, day);
	const dayObj = state.days.find(a => a.name === day);

	if (!dayObj) return [];

	// console.log("dayObj", dayObj);

	const appointments = dayObj.appointments.map(id => state.appointments[id]);

	return appointments;
}

// Gets an interview
export function getInterview(state, interview) {
	if (!interview) return null;

	const interviewObj = {
		student: interview.student,
		interviewer: state.interviewers[interview.interviewer],
	};
	console.log("interviewObj:", interviewObj);
	return interviewObj;
}

// Gets the interviewers for a given day
export function getInterviewersForDay(state, day) {
	if (state.days.length === 0) return [];
	const dayObj = state.days.find(a => a.name === day);

	if (!dayObj) return [];

	const interviewersArray = dayObj.interviewers;

	const interviewers = interviewersArray.map(id => state.interviewers[id]);

	return interviewers;
}
