import { useEffect } from "react";
import { SET_INTERVIEW } from "hooks/reducers";

export default function useSocket(dispatch) {
	useEffect(() => {
		const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
		socket.onopen = () => {
			socket.send(JSON.stringify("ping"));
		};

		socket.onmessage = function (event) {
			const data = JSON.parse(event.data);

			if (typeof data === "object" && data.type === SET_INTERVIEW) {
				dispatch(data);
			}
		};

		return () => {
			socket.close();
		};
	}, [dispatch]);
}
