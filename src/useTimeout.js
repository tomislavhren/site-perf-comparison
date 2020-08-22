import React from 'react';

const useTimeout = ({
	delay,
	onTimeout,
}) => {
	const timedOut = React.useRef(false);
	const timer = React.useRef();

	const handleTimeout = React.useCallback(() => {
		onTimeout();
		timedOut.current = true;
	}, [onTimeout]);

	const startTimer = React.useCallback(() => {
		timer.current = window.setTimeout(handleTimeout, delay);
	}, [handleTimeout, delay]);

	const clearTimer = React.useCallback(() => {
		window.clearTimeout(timer.current);
	}, []);

	const resetTimer = React.useCallback(() => {
		if (!timedOut.current) {
			clearTimer();
			startTimer();
		}
	}, [startTimer, clearTimer]);

	const restartTimer = React.useCallback(() => {
		timedOut.current = false;
		resetTimer();
	}, [resetTimer]);

	React.useEffect(() => {
		timedOut.current = false;
		return () => {
			clearTimer();
		};
	}, [clearTimer]);

	return {
		startTimer,
		restartTimer,
	};
};

export default useTimeout;
