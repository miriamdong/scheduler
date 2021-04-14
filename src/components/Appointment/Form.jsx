import React from "react";
import "./styles.scss";
import { useState } from "react";
import InterviewerList from "components/InterviewerList";
import "components/Button.scss";
import Button from "components/Button";

export default function Header(props) {
	const [studentName, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const reset = function () {
		setName("");
		setInterviewer(null);
	};

	const cancel = function () {
		props.reset();
	};

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form onSubmit={event => event.preventDefault()} autoComplete="off">
					<input
						className="appointment__create-input text--semi-bold"
						value={studentName}
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
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={props.onCancel}>
						Cancel
					</Button>
					<Button confirm onClick={props.onSave(studentName, interviewer)}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
