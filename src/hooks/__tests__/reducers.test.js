import reducers from "../reducers";

describe("Application Reducer", () => {
	it("thows an error with an unsupported type", () => {
		expect(() => reducers({}, { type: null })).toThrowError(
			/tried to reduce with unsupported action type/i
		);
	});
});
