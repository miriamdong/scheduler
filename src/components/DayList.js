import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";
import { getAppointmentsForDay } from "../helpers/selectors";

export default function DayList(props) {
	const days = props.days
		? props.days.map(day => {
				const myAppointments = getAppointmentsForDay(props.state, day.name);
				const leSpotsRemaining = myAppointments.reduce(
					(accu, curr) => (curr.interview ? accu : (accu = accu + 1)),
					0
				);
				return (
					<DayListItem
						name={day.name}
						key={day.id}
						spots={leSpotsRemaining}
						selected={day.name === props.day}
						setDay={props.setDay}
					/>
				);
		  })
		: "No avaibility";

	return <ul>{days}</ul>;
}
