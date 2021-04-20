import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
	const interviewerClass = `interviewers__item ${
		props.selected ? "interviewers__item--selected" : ""
	}`;

	return (
		<li
			className={interviewerClass}
			onClick={props.setInterviewer}
			// selected={props.selected}
			// unselected={props.unselected}
			id={props.id}>
			<img
				className="interviewers__item-image"
				src={props.avatar}
				alt={props.name}
			/>
			{props.selected && props.name}
		</li>
	);
}
