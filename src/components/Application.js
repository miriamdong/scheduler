import "components/Application.scss";
import DayList from "../components/DayList.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "../components/Appointment";

import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "../helpers/selectors";

export default function Application(props) {
	console.log("Application:", props);
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: [],
	});

	// fetch the inital data
	const GET_DAYS = axios.get("/api/days");
	const GET_APPOINTMENTS = axios.get("/api/appointments");
	const GET_INTERVIEWERS = axios.get("/api/interviewers");

	useEffect(() => {
		Promise.all([GET_DAYS, GET_APPOINTMENTS, GET_INTERVIEWERS]).then(all => {
			setState(prev => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	const setAppointment = appointment =>
		setState(prev => ({ ...prev, appointment }));
	const setDay = day => setState({ ...state, day });
	const setInterviewer = interviewer =>
		setState(prev => ({ ...prev, interviewer }));

	function bookInterview(id, interview) {
		console.log("id, interview: ", id, interview);
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		setState({
			...state,
			appointments,
		});
	}

	// Get daily appointments with data
	const dailyAppointments = getAppointmentsForDay(state, state.day);
	console.log("dailyAppointments: ", dailyAppointments);
	const interviewers = getInterviewersForDay(state, state.day);

	const schedule = dailyAppointments.map(appointment => {
		const interview = getInterview(state, appointment.interview);
		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
			/>
		);
	});

	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={state.days} day={state.day} setDay={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">{schedule}</section>
		</main>
	);
}
