import React from "react";
import "./styles.scss";
import { useState } from "react";
import InterviewerList from "components/InterviewerList";
import "components/Button.scss";
import Button from "components/Button";

export default function Form(props) {
	const [name, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState("");

	function validate() {
		if (name === "") {
			setError("Student name cannot be blank");
			return;
		}
		setError("");
		props.onSave(name, interviewer);
	}

	const reset = () => {
		setName("");
		setInterviewer(null);
	};

	// Action performed upon clicking 'Cancel' button
	const cancel = () => {
		reset();
		props.onCancel();
	};

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form onSubmit={event => event.preventDefault()} autoComplete="off">
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						value={name}
						onChange={event => setName(event.target.value)}
						placeholder="Enter Student Name"
						data-testid="student-name-input"
						/*
          This must be a controlled component
        */
					/>
				</form>
				<section className="appointment__validation">{error}</section>
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
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
