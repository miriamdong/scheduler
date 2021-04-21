export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

const updateSpots = (dayName, days, appointments) => {
	const spots = days.find(a => a.name === dayName).appointments;

	const leSpotsRemaining = spots.reduce((accu, curr) => {
		return appointments[curr].interview ? accu : (accu = accu + 1);
	}, 0);

	let newDays = days.map(day =>
		dayName === day.name ? { ...day, spots: leSpotsRemaining } : day
	);

	return newDays;
};

export default function reducers(state, action) {
	switch (action.type) {
		case SET_DAY: {
			return { ...state, day: action.value };
		}
		case SET_APPLICATION_DATA: {
			// console.log("action:", action);
			return {
				...state,
				days: action.days.data,
				interviewers: action.interviewers.data,
				appointments: action.appointments.data,
			};
		}
		case SET_INTERVIEW: {
			const appointments = {
				...state.appointments,
				[action.id]: {
					...state.appointments[action.id],
					interview: action.interview,
				},
			};

			const days = updateSpots(state.day, state.days, appointments);

			return {
				...state,
				appointments,
				days,
			};
		}

		default:
			throw new Error(
				`Tried to reduce with unsupported action type: ${action.type}`
			);
	}
}
