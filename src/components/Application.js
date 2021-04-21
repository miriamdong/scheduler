import "components/Application.scss";
import DayList from "../components/DayList.js";
import React from "react";
import Header from "../components/Appointment/Header";
import Appointment from "../components/Appointment";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData.js";

export default function Application(props) {
	const data = useApplicationData();
	const { state, setDay, bookInterview, cancelInterview } = data;

	const interviewers = getInterviewersForDay(state, state.day);
	// Get daily appointments with data
	const appForTheDay = getAppointmentsForDay(state, state.day);
	const appointments = appForTheDay.map((appointment, index) => {
		return (
			<Appointment
				key={index}
				{...appointment}
				interview={
					appointment ? getInterview(state, appointment.interview) : null
				}
				interviewers={interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
	});
	// console.log("dailyAppointments: ", appointments);
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
					<DayList
						days={state.days}
						day={state.day}
						setDay={setDay}
						state={state}
					/>
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{appointments}
				<Appointment key="last" time="5pm" />
				{/* <Header id={999} className="appointment:last-of-type" time={"5pm"} /> */}
			</section>
		</main>
	);
}
