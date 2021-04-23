import { useState } from "react";

const useVisualMode = initial => {
	const [mode, setMode] = useState(initial);
	const [_history, setHistory] = useState([initial]);

	const transition = (mode, replace = false) => {
		setHistory(history => {
			setMode(mode);
			if (replace === true) {
				const newHistory = [...history.slice(0, -1), mode];
				return newHistory;
			} else {
				return [...history, mode];
			}
		});
	};

	const back = () => {
		setHistory(history => {
			if (history.length === 1) {
				setMode(history[0]);
				return history;
			}

			const newHistory = history.slice(0, -1);
			setMode(newHistory[newHistory.length - 1]);
			return newHistory;
		});
	};

	return { mode, transition, back };
};

export default useVisualMode;
