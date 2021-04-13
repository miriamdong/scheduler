import React from "react";
import "components/DayListItem.scss";
import DayListItem from "./DayListItem";

export default function DayList(props) {
	const days = props.days
		? props.days.map(day => {
				return (
					<DayListItem
						name={day.name}
						key={day.id}
						spots={day.spots}
						selected={day.name === props.day}
						setDay={props.setDay}
					/>
				);
		  })
		: "No avaibility";

	return <ul>{days}</ul>;
}
