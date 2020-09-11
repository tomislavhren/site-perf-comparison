import React from 'react';
import './pageTiming.css';
import TimingItem from './TimingItem';
import ServerInfo from './ServerInfo';
import { calculateDiffPercentage } from '../../core/utils';

const PageTiming = ({
	videoSrc,
	ttfb,
	ttfb2,
	firstPaintTime,
	firstPaintTime2,
	pageLoadTime,
	pageLoadTime2,
	ySlowScore,
	ySlowScore2,
	pageSpeedScore,
	pageSpeedScore2,
	serverName,
	serverLocation,
	highlighted,
}) => {
	return (
		<div className="page-timings">
			<ServerInfo name={serverName} location={serverLocation} />

			<div className="timing-results">
				<TimingItem
					result={ttfb && `${ttfb} ms`}
					label="TTFB"
					percentageDiff={calculateDiffPercentage(ttfb, ttfb2)}
					tooltipLabel="Time to first byte"
					tooltipText="Time to first byte is one of the most popular measurements used as an indication of the responsivenes of a webserver or other network resource"
					highlighted={highlighted}
				/>
				<TimingItem
					result={firstPaintTime && `${firstPaintTime} ms`}
					percentageDiff={calculateDiffPercentage(
						firstPaintTime,
						firstPaintTime2
					)}
					label="First Paint"
					tooltipLabel="First Paint"
					tooltipText="First Paint measures the time from navigation to the time when the browser renders the first bit of content from the DOM."
					highlighted={highlighted}
				/>
				<TimingItem
					result={pageLoadTime && `${pageLoadTime} ms`}
					percentageDiff={calculateDiffPercentage(pageLoadTime, pageLoadTime2)}
					label="Page Load Time"
					highlighted={highlighted}
				/>
			</div>

			<video
				style={{ background: '#EFE5E5' }}
				autoPlay
				width="100%"
				height="auto"
				src={`//${videoSrc}`}
			></video>

			<div className="timing-results">
				<TimingItem
					result={pageSpeedScore && `A (${pageSpeedScore}%)`}
					label="PageSpeed Score"
					percentageDiff={calculateDiffPercentage(
						pageSpeedScore2,
						pageSpeedScore
					)}
					tooltipLabel="PageSpeed Score"
					tooltipText="This score is determined by running Lighthouse to collect and analyze lab data about the page. A score of 90 or above is considered good. 50 to 90 is a score that needs improvement, and below 50 is considered poor."
					highlighted={highlighted}
				/>
				<TimingItem
					result={ySlowScore && `A (${ySlowScore}%)`}
					percentageDiff={calculateDiffPercentage(ySlowScore2, ySlowScore)}
					label="YSlow Score"
					tooltipLabel="YSlow Score"
					tooltipText="YSlow works by crawling your website and comparing it against a list of 23 rules, based on Yahoo's rules for high-performance websites. YSlow then scores your site against these 23 rules and gives you an overall score based on the average."
					highlighted={highlighted}
				/>
			</div>
		</div>
	);
};

export default PageTiming;
