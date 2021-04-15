export function getAppointmentsForDay(state, day) {
	if (state.days.length === 0) return [];
	// if (state.days.name === day) return day;

	const filteredDay = state.days.filter(a => a.name === day);

	console.log(filteredDay);
	const appointmentArray = filteredDay.map(day => day.appointments);
	console.log(appointmentArray);
	const merged = [].concat.apply([], appointmentArray);

	const appointments = merged.map(id => state.appointments[id]);
	console.log(appointments);
	return appointments;
}

// Gets an interview
export function getInterview(state, interview) {
	if (!interview) return null;

	const interviewObj = {
		student: interview.student,
	};

	interviewObj.interviewer = state.interviewers[interview.interviewer];
	return interviewObj;
}

// // Gets the interviewers for a given day
// export function getInterviewersForDay(state, dayName) {
// 	const filteredDay = state.days.filter(day => day.name === dayName);

// 	if (filteredDay.length === 0 || state.days.length === 0) {
// 		return [];
// 	}

// 	const interviewersArray = filteredDay[0].interviewers;

// 	const foundInterviewers = interviewersArray.map(id => {
// 		return state.interviewers[id];
// 	});

// 	return foundInterviewers;
// }
