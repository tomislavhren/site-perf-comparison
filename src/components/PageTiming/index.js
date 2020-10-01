import React from 'react';
import ServerInfo from './ServerInfo';
import GTMetrixLink from './GTMetrixLink';
import GTMetrix from './GTMetrix';

const PageTiming = ({
	serverName,
	serverLocation,
	serverImgSrc,
	isRocket,
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
		<div className="row__col row__col--xs-12 row__col--l-6">
			<div className="card">
				<ServerInfo
					name={serverName}
					location={serverLocation}
					imgSrc={serverImgSrc}
				/>

				{data && (
					<GTMetrix
						reportUrl={reportUrl}
						ttfb={ttfb}
						firstPaintTime={firstPaintTime}
						pageLoadTime={pageLoadTime}
						pageSpeedScore={pageSpeedScore}
						ySlowScore={ySlowScore}
						isRocket={isRocket}
					/>
				)}

				{data && <GTMetrixLink reportUrl={reportUrl} />}
			</div>
		</div>
	);
};

export default PageTiming;
