import React from 'react';
import ReportThumbnail from '../ReportThumbnail';
import TimingItem from '../TimingItem';

const getGrade = score => {
	const index = 10 - (Math.floor(score / 10) + (score < 100 ? 1 : 0));
	return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'][index];
};

const formatMs = value => `${value} ms`;

const formatYSlowScore = score => `${getGrade(score)} (${score}%)`;

const formatPageSpeedScore = score => `${getGrade(score)} (${score}*%)`;

const GTMetrix = ({
	reportUrl,
	ttfb,
	firstPaintTime,
	pageLoadTime,
	pageSpeedScore,
	ySlowScore,
	isRocket,
}) => {
	const tooltipSuffix = isRocket ? 'rocket' : 'origin';

	return (
		<div className="card__gtmetrix">
			<ReportThumbnail reportUrl={reportUrl} />
			<div className="card__gtmetrix-results">
				<TimingItem
					result={formatMs(ttfb.data)}
					label="TTFB"
					percentageDiff={ttfb.diff}
					tooltipId={`tooltip--ttf-${tooltipSuffix}`}
					tooltipTitle="Time to first byte"
					tooltipText="Time to first byte is one of the most popular measurements used as an indication of the responsivenes of a webserver or other network resource"
					highlighted={isRocket}
				/>
				<TimingItem
					result={formatMs(firstPaintTime.data)}
					percentageDiff={firstPaintTime.diff}
					label="First Paint"
					tooltipId={`tooltip--first-paint-${tooltipSuffix}`}
					tooltipTitle="First Paint"
					tooltipText="First Paint measures the time from navigation to the time when the browser renders the first bit of content from the DOM."
					highlighted={isRocket}
				/>
				<TimingItem
					result={formatMs(pageLoadTime.data)}
					percentageDiff={pageLoadTime.diff}
					label="Page Load Time"
					highlighted={isRocket}
				/>
				<TimingItem
					result={formatPageSpeedScore(pageSpeedScore.data)}
					positiveLabel="better"
					negativeLabel="lower"
					label="PageSpeed Score"
					percentageDiff={pageSpeedScore.diff}
					tooltipId={`tooltip--page-speed-score-${tooltipSuffix}`}
					tooltipTitle="PageSpeed Score"
					tooltipText="This score is determined by running Lighthouse to collect and analyze lab data about the page. A score of 90 or above is considered good. 50 to 90 is a score that needs improvement, and below 50 is considered poor."
					highlighted={isRocket}
				/>
				<TimingItem
					result={formatYSlowScore(ySlowScore.data)}
					positiveLabel="better"
					negativeLabel="lower"
					percentageDiff={ySlowScore.diff}
					label="YSlow Score"
					tooltipId={`tooltip--yslow-score-${tooltipSuffix}`}
					tooltipTitle="YSlow Score"
					tooltipText="YSlow works by crawling your website and comparing it against a list of 23 rules, based on Yahoo's rules for high-performance websites. YSlow then scores your site against these 23 rules and gives you an overall score based on the average."
					highlighted={isRocket}
				/>
			</div>
		</div>
	);
};

export default GTMetrix;
