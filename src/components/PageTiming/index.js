import React from 'react';
import './pageTiming.css';
import TimingItem from './TimingItem';
import ServerInfo from './ServerInfo';
import ReportThumbnail from './ReportThumbnail';
import GTMetrixLink from './GTMetrixLink';

const PageTiming = ({
	serverName,
	serverLocation,
	serverImgSrc,
	highlighted,
	data,
}) => {
	const {
		ttfb,
		pageLoadTime,
		pageSpeedScore,
		ySlowScore,
		firstPaintTime,
		reportUrl,
	} = data || {};

	return (
		<div className="test-cards">
			<div className="test-cards__server">
				<ServerInfo
					name={serverName}
					location={serverLocation}
					imgSrc={serverImgSrc}
				/>
			</div>

			{data && (
				<div className="test-cards__gtmetrix">
					<ReportThumbnail reportUrl={reportUrl} />
					<div className="test-cards__results">
						<TimingItem
							result={ttfb.data && `${ttfb.data} ms`}
							label="TTFB"
							percentageDiff={ttfb.diff}
							tooltipLabel="Time to first byte"
							tooltipText="Time to first byte is one of the most popular measurements used as an indication of the responsivenes of a webserver or other network resource"
							highlighted={highlighted}
						/>
						<TimingItem
							result={firstPaintTime.data && `${firstPaintTime.data} ms`}
							percentageDiff={firstPaintTime.diff}
							label="First Paint"
							tooltipLabel="First Paint"
							tooltipText="First Paint measures the time from navigation to the time when the browser renders the first bit of content from the DOM."
							highlighted={highlighted}
						/>
						<TimingItem
							result={pageLoadTime.data && `${pageLoadTime.data} ms`}
							percentageDiff={pageLoadTime.diff}
							label="Page Load Time"
							highlighted={highlighted}
						/>
						<TimingItem
							result={pageSpeedScore.data && `A (${pageSpeedScore.data}%)`}
							label="PageSpeed Score"
							percentageDiff={pageSpeedScore.diff}
							tooltipLabel="PageSpeed Score"
							tooltipText="This score is determined by running Lighthouse to collect and analyze lab data about the page. A score of 90 or above is considered good. 50 to 90 is a score that needs improvement, and below 50 is considered poor."
							highlighted={highlighted}
						/>
						<TimingItem
							result={ySlowScore.data && `A (${ySlowScore.data}%)`}
							percentageDiff={ySlowScore.diff}
							label="YSlow Score"
							tooltipLabel="YSlow Score"
							tooltipText="YSlow works by crawling your website and comparing it against a list of 23 rules, based on Yahoo's rules for high-performance websites. YSlow then scores your site against these 23 rules and gives you an overall score based on the average."
							highlighted={highlighted}
						/>
					</div>
				</div>
			)}

			{data && (
				<div className="test-cards__gtmetrix-link">
					<GTMetrixLink reportUrl={reportUrl} />
				</div>
			)}
		</div>
	);
};

export default PageTiming;
