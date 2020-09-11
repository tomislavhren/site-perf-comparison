export const extractPerformanceProps = performanceData => {
	const {
		page_load_time: pageLoadTime,
		first_paint_time: firstPaintTime,
		html_load_time: ttfb,
		yslow_score: ySlowScore,
		pagespeed_score: pageSpeedScore,
	} = performanceData || {};

	const props = {
		pageLoadTime,
		firstPaintTime,
		ttfb,
		ySlowScore,
		pageSpeedScore,
	};

	return props;
};

export const validateURL = url => {
	const { origin } = new URL(url);
	if (!origin || origin === 'null') {
		throw new Error(`Something is wrong with the URL: ${url}`);
	}

	return origin;
};

export const calculateDiffPercentage = (oldValue, newValue) => {
	if (!newValue) {
		return null;
	}

	return (newValue - oldValue) / newValue;
};

export const toPercentageString = val => {
	if (!val) {
		return;
	}

	const perc = Math.abs(Math.round(val * 100));
	return `${perc}%`;
};

export const log = entry => {
	process.env.NODE_ENV === 'development' && console.log(entry);
};

export const isEmpty = (obj = {}) => Object.keys(obj).length === 0;

export const wait = delay =>
	new Promise(resolve => setTimeout(resolve, delay * 1000));
