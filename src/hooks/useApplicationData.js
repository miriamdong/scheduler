import axios from "axios";
import { useReducer, useEffect } from "react";
// import { createStore } from "redux";
import reducers, {
	SET_DAY,
	SET_APPLICATION_DATA,
	SET_INTERVIEW,
	ADD,
	SUBTRACT,
	SET_APPOINTMENTS,
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
	const GET_DAYS = axios.get("/api/days");
	const GET_APPOINTMENTS = axios.get("/api/appointments");
	const GET_INTERVIEWERS = axios.get("/api/interviewers");

	useEffect(() => {
		Promise.all([GET_DAYS, GET_APPOINTMENTS, GET_INTERVIEWERS]).then(
			([days, appointments, interviewers]) => {
				dispatch({
					type: SET_APPLICATION_DATA,
					days,
					appointments,
					interviewers,
				});
			}
		);
	}, []);

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:8001", "protocolOne");
		socket.onopen = () => {
			console.log("Connected");
		};
		// socket.send(JSON.stringify("ping"));

		socket.onmessage = event => {
			console.log(`Message Received: ${event.data}`);
			const eventData = JSON.parse(event.data);
			console.log("event:::", JSON.parse(event.data));
			// console.log(`Message:${eventData.type}`);
			if (eventData.type === "SET_INTERVIEW") {
				// dispatch({ type: SET_INTERVIEW, event: event.interview });
				console.log("here");
				dispatch(eventData);
			}
		};

		return () => {
			socket.close();
		};
	}, [dispatch]);

	const setDay = day => dispatch({ type: SET_DAY, value: day });
	// const store = createStore(reducer);

	const reduceSpots = (state, { type, value }) => {
		return reducers[type](state, value) || state;
	};

	const updateSpots = (day, days, action) => {
		const dayObj = days.filter(a => a.name === day)[0];
		if (action === ADD) dayObj.spots -= 1;
		if (action === SUBTRACT) dayObj.spots += 1;
	};

	const bookInterview = (id, interview) => {
		console.log("id, interview: ", id, interview);
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		dispatch({ type: SET_INTERVIEW, interview });
		// dispatch({ type: ADD, value: 1 });
		updateSpots(state.day, state.days, ADD);
		return axios
			.put(`/api/appointments/${id}`, appointment)
			.then(() => dispatch({ type: SET_APPOINTMENTS, appointments }));
	};

	const cancelInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		dispatch({ type: SET_INTERVIEW, interview: null });
		updateSpots(state.day, state.days, SUBTRACT);
		// console.log(state.day, state.days,);
		// dispatch({ type: SUBTRACT, value: 1 });
		return axios
			.delete(`/api/appointments/${id}`, appointment)
			.then(() => dispatch({ type: SET_APPOINTMENTS, appointments }));
	};

	return { state, setDay, bookInterview, cancelInterview };
}
