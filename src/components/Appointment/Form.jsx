import React from "react";
import "./styles.scss";
import { useState } from "react";
import InterviewerList from "components/InterviewerList";
import "components/Button.scss";
import Button from "components/Button";

export default function Form(props) {
	console.log("Form:", props);
	const [name, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);

	// const reset = () => {
	// 	setName("");
	// 	setInterviewer(null);
	// };

	// const cancel = () => {
	// 	props.reset();
	// };

	const save = () => {
		props.onSave(name, interviewer);
	};

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form onSubmit={event => event.preventDefault()} autoComplete="off">
					<input
						className="appointment__create-input text--semi-bold"
						value={name}
						onChange={event => setName(event.target.value)}
						placeholder={props.placeholder}
						/*
          This must be a controlled component
        */
					/>
				</form>
				<InterviewerList
					interviewers={props.interviewers}
					value={interviewer}
					onChange={event => setInterviewer(event)}
					key={props.id}
					id={props.id}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={props.onCancel}>
						Cancel
					</Button>
					<Button confirm onClick={save}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
