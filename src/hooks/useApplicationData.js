import axios from "axios";
import { useReducer, useEffect } from "react";
import reducers, { SET_DAY, SET_APPLICATION_DATA } from "./reducers";
import useSocket from "hooks/useSocket";

export default function useApplicationData(props) {
	// console.log("useApplicationData:", props);
	// initial state
	const initState = {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	};
	const [state, dispatch] = useReducer(reducers, initState);

	// fetch the inital data
	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		]).then(([days, appointments, interviewers]) => {
			dispatch({
				type: SET_APPLICATION_DATA,
				days,
				appointments,
				interviewers,
			});
		});
	}, []);

	useSocket(dispatch);

	const setDay = day => dispatch({ type: SET_DAY, value: day });

	const bookInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		return axios.put(`/api/appointments/${id}`, appointment);
		// .then(() => dispatch({ type: SET_APPOINTMENTS, appointments }));
	};

	const cancelInterview = id => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		return axios.delete(`/api/appointments/${id}`, appointment);
		// .then(() => dispatch({ type: SET_APPOINTMENTS, appointments }));
	};

	return { state, setDay, bookInterview, cancelInterview };
}
