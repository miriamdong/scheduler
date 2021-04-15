import "components/Application.scss";
import DayList from "../components/DayList.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "../components/Appointment";
import InterviewerList from "../components/InterviewerList";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		// you may put the line below, but will have to remove/comment hardcoded appointments variable
		appointments: {},
	});

	const setDay = day => setState({ ...state, day });
	// const setDays = days => setState(prev => ({ ...prev, days }));
	// const setAppointment = appointment =>
	// 	setState(prev => ({ ...prev, appointment }));
	const [interviewer, setInterviewer] = useState(props.preselected);
	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const schedule = dailyAppointments.map(appointment => {
		const interview = getInterview(state, appointment.interview);

		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
			/>
		);
	});

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
	console.log(dailyAppointments);
	// useEffect(() => {
	// 	axios.get("/api/appointments").then(response => {
	// 		setAppointment([...response.data]);
	// 	});
	// }, []);

	// useEffect(() => {
	// 	const testURL = `http://localhost:8001/api/days`;
	// 	axios.get(testURL).then(response => {
	// 		console.log("response.data.results: ", response);
	// 		setDays([...response.data]);
	// 	});
	// }, []);

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
			<section className="schedule">
				{schedule}

				<InterviewerList
					interviewer={interviewer}
					setInterviewer={setInterviewer}
				/>
			</section>
		</main>
	);
}
