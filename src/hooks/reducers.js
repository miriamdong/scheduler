export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_APPOINTMENTS = "SET_APPOINTMENTS";
export const ADD = "ADD";
export const SUBTRACT = "SUBTRACT";

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
			// console.log("interview-action:", action.interview);
			// const appointments = state.appointments.map(app => {
			// 	return app.id === action.interview.id ? action.interview : app;
			// });
			return {
				...state,
				appointments: {
					...state.appointments,
					[action.id]: {
						...state.appointments[action.id],
						interview: action.interview,
					},
				},
			};
		}

		// case ADD: {
		// 	// console.log("state, action.value: ", state, action);
		// 	return { ...state, spots: action.day.spots + action.value };
		// }
		// case SUBTRACT: {
		// 	return { ...state, spots: action.day.spots - action.value };
		// }

		default:
			throw new Error(
				`Tried to reduce with unsupported action type: ${action.type}`
			);
	}
}
