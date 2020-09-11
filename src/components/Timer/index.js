import React from "react";
import "./timer.css";

const Timer = ({ onMount }) => {
	const timer = React.useRef();
	const startTime = React.useRef();
	const [time, setTime] = React.useState();

	function startTimer() {
		startTime.current = Date.now();
		timer.current = setInterval(() => setTime(Date.now()), 100);
	}

	function stopTimer() {
		clearInterval(timer.current);
	}

	function resetTimer() {
		stopTimer();
		startTime.current = null;
		setTime(null);
	}

	React.useEffect(() => {
		onMount({ startTimer, stopTimer, resetTimer });
	}, []);

	const diff = new Date(time - startTime.current);
	const [h, m, s] = [diff.getHours() - 1, diff.getMinutes(), diff.getSeconds()];

	return (
		<div className="timer">
			<strong>{h > 9 ? h : `0${h || 0}`}</strong>h :{" "}
			<strong>{m > 9 ? m : `0${m || 0}`}</strong>m :{" "}
			<strong>{s > 9 ? s : `0${s || 0}`}</strong>s
		</div>
	);
};

export default Timer;
