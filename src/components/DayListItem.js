import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames/bind";

export default function DayListItem(props) {
	let dayClass = classNames("day-list__item", {
		"day-list__item--selected": props.selected,
		"day-list__item--full": props.spots === 0,
	});

	const formatSpots = props => {
		if (props.spots > 1) {
			return props.spots + " spots remaining";
		}
		if (props.spots === 1) {
			return props.spots + " spot remaining";
		}
		if (props.spots === 0) {
			return "no spots remaining";
		}
	};
	return (
		<li className={dayClass} onClick={() => props.setDay(props.name)}>
			<h2 className="text--regular">{props.name}</h2>
			<h3 className="text--light">{formatSpots(props)}</h3>
		</li>
	);
}