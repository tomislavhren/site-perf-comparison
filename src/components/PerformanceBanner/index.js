import React from 'react';
import { toPercentageString } from '../../core/utils';
import './performanceBanner.css';

const PerformanceBanner = ({ diff }) => {
	const isFaster = diff <= 0;
	return (
		<div className="performance-banner">
			<div className="performance-banner__title">
				Your site loads{' '}
				<span className={isFaster ? 'text-success' : 'text-danger'}>
					{toPercentageString(diff)} {isFaster ? 'faster' : 'slower'} on Rocket!
				</span>
			</div>
			<div className="performance-banner__subTitle">
				We recommend running the test several times for a clearer result.
			</div>
		</div>
	);
};

export default PerformanceBanner;
