//export const extractPerformanceProps = performanceData => {
//	const {
//		page_load_time: pageLoadTime,
//		first_paint_time: firstPaintTime,
//		html_load_time: ttfb,
//		yslow_score: ySlowScore,
//		pagespeed_score: pageSpeedScore,
//		report_url: reportUrl,
//	} = performanceData || {};

//	const props = {
//		pageLoadTime,
//		firstPaintTime,
//		ttfb,
//		ySlowScore,
//		pageSpeedScore,
//		reportUrl,
//	};

//	return props;
//};

export const extractPerformanceProps = (
	originalSitePerformanceResults,
	clonedSitePerformanceResults
) => {
	if (!originalSitePerformanceResults && !clonedSitePerformanceResults) {
		return {
			cloned: null,
			original: null,
		};
	}

	const {
		page_load_time: pageLoadTime,
		first_paint_time: firstPaintTime,
		html_load_time: ttfb,
		yslow_score: ySlowScore,
		pagespeed_score: pageSpeedScore,
		report_url: reportUrl,
	} = originalSitePerformanceResults;

	const {
		page_load_time: pageLoadTime2,
		first_paint_time: firstPaintTime2,
		html_load_time: ttfb2,
		yslow_score: ySlowScore2,
		pagespeed_score: pageSpeedScore2,
		report_url: reportUrl2,
	} = clonedSitePerformanceResults;

	const cloned = {
		pageLoadTime: {
			data: pageLoadTime2,
			diff: calculateDiffPercentage(pageLoadTime2, pageLoadTime),
		},
		firstPaintTime: {
			data: firstPaintTime2,
			diff: calculateDiffPercentage(firstPaintTime2, firstPaintTime),
		},
		ttfb: { data: ttfb2, diff: calculateDiffPercentage(ttfb2, ttfb) },
		ySlowScore: {
			data: ySlowScore2,
			diff: -calculateDiffPercentage(ySlowScore2, ySlowScore), // -1 = hack because higher score means better results
		},
		pageSpeedScore: {
			data: pageSpeedScore2,
			diff: -calculateDiffPercentage(pageSpeedScore2, pageSpeedScore), // -1 = hack because higher score means better results
		},
		reportUrl: reportUrl2,
	};

	const original = {
		pageLoadTime: { data: pageLoadTime },
		firstPaintTime: { data: firstPaintTime },
		ttfb: { data: ttfb },
		ySlowScore: { data: ySlowScore },
		pageSpeedScore: { data: pageSpeedScore },
		reportUrl: reportUrl,
	};

	return {
		cloned,
		original,
	};
};

export const sanitizeAndValidateURL = url => {
	const { origin, href } = new URL(url);
	if (!origin || origin === 'null') {
		throw new Error(`Something is wrong with the URL: ${url}`);
	}

	return href.replace(/(.*)\/$/, '$1');
};

export const calculateDiffPercentage = (newValue, oldValue) => {
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
