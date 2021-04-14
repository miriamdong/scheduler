import React, { Fragment } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
// import Confirm from "components/Appointment/Confirm";
// import Status from "components/Appointment/Status";
// import Error from "components/Appointment/Error";
// import Form from "components/Appointment/Form";

export default function Appointment(props) {
	console.log("props: ", props);
	console.log("interview: ", props.interview);
	// console.log("interviewer", props.interview.interviewer);
	const interview = props.interview ? (
		<Show
			student={props.interview.student}
			interviewer={props.interview.interviewer}
		/>
	) : (
		<Empty onClick={props.onAdd} />
	);
	return (
		<>
			<main>
				<Header
					id={props.id}
					className="appointment:last-of-type"
					time={props.time}
				/>
				{interview}
			</main>
		</>
	);
}
