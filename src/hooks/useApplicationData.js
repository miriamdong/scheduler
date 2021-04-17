import axios from "axios";
import React, { useReducer, useEffect } from "react";
// import { createReducer } from "@reduxjs/toolkit";

export default function useApplicationData(props) {
	const SET_DAY = "SET_DAY";
	const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
	const SET_INTERVIEW = "SET_INTERVIEW";

	function reducer(state, action) {
		switch (action.type) {
			case SET_DAY: {
				return { ...state, day: action.value };
			}
			case SET_APPLICATION_DATA: {
				console.log("action:", action);
				return {
					...state,
					days: action.days.data,
					interviewers: action.interviewers.data,
					appointments: action.appointments.data,
				};
			}

			case SET_INTERVIEW: {
				console.log("interview:", action);
				return { ...state, interview: action.appointments };
			}
			default:
				throw new Error(
					`Tried to reduce with unsupported action type: ${action.type}`
				);
		}
	}

	// initial state
	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

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

	const setDay = day => dispatch({ type: SET_DAY, day });
	// const setInterviewer = interviewer =>
	// 	setState(prev => ({ ...prev, interviewer }));

	const updateSpots = (day, days, func) => {
		const dayObj = days.filter(a => a.name === day)[0];
		if (func === "book") dayObj.spots -= 1;
		if (func === "delete") dayObj.spots += 1;
	};

	const bookInterview = (id, interview) => {
		// console.log("id, interview: ", id, interview);
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		dispatch({ type: SET_INTERVIEW, interview });
		updateSpots(state.day, state.days, "book");

		return axios
			.put(`/api/appointments/${id}`, appointment)
			.then(() => dispatch({ type: SET_INTERVIEW, appointments }));
	};

	const cancelInterview = id => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		dispatch({ type: SET_INTERVIEW, id, interview: null });
		updateSpots(state.day, state.days, "delete");
		return axios
			.delete(`/api/appointments/${id}`, appointment)
			.then(() => dispatch({ type: SET_INTERVIEW, appointments }));
	};

	return { state, setDay, bookInterview, cancelInterview };
}
