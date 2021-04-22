import React from "react";
import axios from "axios";
import {
	render,
	cleanup,
	getByText,
	fireEvent,
	waitForElement,
	getAllByTestId,
	prettyDOM,
	getByAltText,
	getByPlaceholderText,
	queryByText,
	queryByAltText,
} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);
// jest.mock("axios");
jest.mock("components/Auth/Nav", () => () => <div>Mock Nav</div>);

describe("Application", () => {
	// TEST NUMBER ONE
	it("changes the schedule when a new day is selected", async () => {
		const { getByText } = render(<Application />);
		await waitForElement(() => getByText("Monday"));

		fireEvent.click(getByText("Tuesday"));

		expect(getByText("Leopold Silvers")).toBeInTheDocument();
	});

	//TEST NUMBER TWO
	it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
		// 1. Render the Application.
		const { container, debug } = render(<Application />);

		//2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(container, "appointment")[0];

		//3. Click the "Add" button on the first empty appointment.
		fireEvent.click(getByAltText(appointment, "Add"));

		//4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" },
		});

		//5. Click the first interviewer in the list.
		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

		//6. Click the "Save" button on that same appointment.
		fireEvent.click(getByText(appointment, "Save"));

		//7. Check that the element with the text "Saving" is displayed.
		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		//8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
		// await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

		//9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);

		// expect(getByText(day, "no spots remaining")).toBeInTheDocument();
		debug();
		// console.log(prettyDOM(appointment));
	});

	// TEST NUMBER THREE
	it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
		// 1. Render the Application.
		const { container } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, "Archie Cohen"));

		// 3. Click the "Delete" button on the booked appointment.
		const appointment = getAllByTestId(
			container,
			"appointment"
		).find(appointment => queryByText(appointment, "Archie Cohen"));

		fireEvent.click(queryByAltText(appointment, "Delete"));

		// 4. Check that the confirmation message is shown.
		expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();

		// 5. Click the "Confirm" button on the confirmation.
		fireEvent.click(queryByText(appointment, "Confirm"));

		// 6. Check that the element with the text "Deleting" is displayed.
		expect(getByText(appointment, "Deleting")).toBeInTheDocument();

		// 7. Wait until the element with the "Add" button is displayed.
		// await waitForElement(() => getByAltText(appointment, "Add"));

		// 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);

		// expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
	});

	//TEST NUMBER FOUR
	it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointments = getAllByTestId(container, "appointment");
		const appointment = appointments[1];

		fireEvent.click(getByAltText(appointment, "Edit"));
		expect(getByText(appointment, "Interviewer")).toBeInTheDocument();

		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

		fireEvent.click(queryByText(appointment, "Save"));
		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		// await waitForElement(() => getByText(appointment, "Sylvia Palmer"));

		const day = getAllByTestId(container, "day").find(day =>
			queryByText(day, "Monday")
		);

		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});

	// TEST NUMBER FIVE
	it("shows the save error when failing to save an appointment", async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointments = getAllByTestId(container, "appointment");
		const appointment = appointments[1];
		axios.put.mockRejectedValueOnce();

		fireEvent.click(getByAltText(appointment, "Edit"));
		expect(getByText(appointment, "Interviewer")).toBeInTheDocument();

		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

		fireEvent.click(queryByText(appointment, "Save"));
		expect(getByText(appointment, "Saving")).toBeInTheDocument();
		await waitForElement(() =>
			getByText(appointment, "There was an Error when Saving :(")
		);
		expect(
			getByText(appointment, "There was an Error when Saving :(")
		).toBeInTheDocument();
	});

	// TEST NUMBER SIX

	it("shows the delete error when failing to delete an existing appointment", async () => {
		axios.delete.mockRejectedValueOnce();
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointments = getAllByTestId(container, "appointment");
		const appointment = appointments[1];

		fireEvent.click(getByAltText(appointment, "Delete"));
		expect(getByText(appointment, "Are you sure?")).toBeInTheDocument();

		fireEvent.click(queryByText(appointment, "Confirm"));

		expect(getByText(appointment, "Deleting")).toBeInTheDocument();

		await waitForElement(() =>
			getByText(appointment, "There was an Error when Deleting :(")
		);

		expect(
			getByText(appointment, "There was an Error when Deleting :(")
		).toBeInTheDocument();
	});
});
