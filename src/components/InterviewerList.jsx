import React from "react";
import "components/InterviewerListItem.scss";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
	console.log(props);
	const interviewers = props.interviewers.map(interviewer => {
		return (
			<InterviewerListItem
				id={interviewer.id}
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={interviewer.id === props.value}
				setInterviewer={event => {
					props.onChange(interviewer.id);
				}}
			/>
		);
	});

	console.log("interviewers: ", props.interviewers);

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{interviewers}</ul>
		</section>
	);
}

InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
};
