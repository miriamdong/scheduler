import React from "react";
import "components/InterviewerListItem.scss";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
	const interviewers = props.interviewers
		? props.interviewers.map(interviewer => {
				return (
					<InterviewerListItem
						name={interviewer.name}
						key={interviewer.id}
						avatar={interviewer.avatar}
						selected={interviewer.id === props.value}
						setInterviewer={event => {
							props.onChange(interviewer.id);
						}}
					/>
				);
		  })
		: "No avaibility";

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{interviewers}</ul>
		</section>
	);
}
