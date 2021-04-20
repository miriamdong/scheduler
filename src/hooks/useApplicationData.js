import axios from "axios";
import { useReducer, useEffect } from "react";
// import { createStore } from "redux";
import reducers, {
	SET_DAY,
	SET_APPLICATION_DATA,
	SET_INTERVIEW,
} from "./reducers";
// import useSocket from "hooks/useSocket";

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

	useEffect(() => {
		const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
		socket.onopen = () => {
			// console.log("Connected");
			socket.send(JSON.stringify("ping"));
		};

		socket.onmessage = function (event) {
			// console.log(`Message Received: ${event.data}`);
			const data = JSON.parse(event.data);
			console.log("event:::", JSON.parse(event.data));
			// console.log(`Message:${eventData.type}`);

			if (typeof data === "object" && data.type === SET_INTERVIEW) {
				// dispatch({ type: SET_INTERVIEW, event: event.interview });
				// console.log("here");
				dispatch(data);
			}
		};

		return () => {
			socket.close();
		};
	}, [dispatch]);

	const setDay = day => dispatch({ type: SET_DAY, value: day });

	const bookInterview = (id, interview) => {
		// console.log("id, interview: ", id, interview);
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
