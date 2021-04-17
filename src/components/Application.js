import "components/Application.scss";
import DayList from "../components/DayList.js";
import React from "react";
import Appointment from "../components/Appointment";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData.js";

export default function Application(props) {
	console.log("Application:", props);

	const data = useApplicationData();
	const { state, setDay, bookInterview, cancelInterview } = data;

	const interviewers = getInterviewersForDay(state, state.day);
	// Get daily appointments with data
	const appointments = getAppointmentsForDay(state, state.day).map(
		appointment => {
			return (
				<Appointment
					key={appointment.id}
					{...appointment}
					interview={getInterview(state, appointment.interview)}
					interviewers={interviewers}
					bookInterview={bookInterview}
					cancelInterview={cancelInterview}
				/>
			);
		}
	);
	console.log("dailyAppointments: ", appointments);
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
				<section className="schedule">
					{appointments}
					<Appointment key="last" time="5pm" />
				</section>
			</section>
		</main>
	);
}
