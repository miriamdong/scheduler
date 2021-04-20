import React, { useEffect } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
	console.log("index-Appointment:", props);
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRMING";
	const EDIT = "EDIT";
	const ERROR_SAVE = "ERROR_SAVE";
	const ERROR_DELETE = "ERROR_DELETE";
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	console.log(props.interview);
	const save = (name, interviewer) => {
		if (!interviewer) return;
		const interview = {
			student: name,
			interviewer,
		};
		console.log("interview:", interview);
		transition(SAVING);
		props
			.bookInterview(props.id, interview)
			// .then(() => transition(SHOW))
			.catch(error => transition(ERROR_SAVE, true));
	};

	const deleteInterview = event => {
		console.log("event:", event);
		transition(DELETING, true);
		props
			.cancelInterview(props.id, props.interview)
			// .then(() => transition(EMPTY))
			.catch(error => transition(ERROR_DELETE, true));
	};

	useEffect(() => {
		if (props.interview) {
			transition(SHOW);
		} else {
			transition(EMPTY);
		}
	}, [props.interview]);

	useEffect(() => {
		const interview = props.interview;
		console.log(interview);
		if (interview && mode === EMPTY) {
			transition(SHOW);
		}
		if (interview === null && mode === SHOW) {
			transition(EMPTY);
		}
	}, [props.interview, transition, mode]);

	return (
		<>
			<Header
				id={props.id}
				className="appointment:last-of-type"
				time={props.time}
			/>
			<main>
				{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
				{mode === SHOW && props.interview && (
					<Show
						student={props.interview.student}
						interviewer={props.interview.interviewer}
						onDelete={() => transition(CONFIRM)}
						onEdit={() => transition(EDIT)}
					/>
				)}
				{mode === CREATE && (
					<Form
						interviewers={props.interviewers}
						onSave={save}
						onCancel={back}
					/>
				)}
				{mode === SAVING && <Status message="Saving" />}
				{mode === DELETING && <Status message="Deleting" />}
				{mode === CONFIRM && (
					<Confirm
						message="Are you sure?"
						onCancel={() => transition(SHOW)}
						onConfirm={deleteInterview}
					/>
				)}
				{mode === EDIT && (
					<Form
						name={props.interview.student}
						interviewer={props.interview.interviewer}
						interviewers={props.interviewers}
						onSave={save}
						onCancel={back}
					/>
				)}
				{mode === ERROR_DELETE && (
					<Error message="Error Deleting" back={back} />
				)}
				{mode === ERROR_SAVE && <Error message="Error Saving" back={back} />}
			</main>
		</>
	);
}
