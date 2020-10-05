import React from 'react';
import { toPercentageString } from '../../../core/utils';

const PerformanceBanner = ({ diff }) => {
	const isFaster = diff <= 0;
	return (
		<div className="test__result">
			<h2 className="title title--l color color--black-pearl distance distance--xxs">
				Your site loads{' '}
				<span className={isFaster ? 'color color--limeade' : ''}>
					{toPercentageString(diff)} {isFaster ? 'faster' : 'slower'} on Rocket!
				</span>
			</h2>
			<div className="paragraph paragraph--m">
				<p>We recommend running the test several times for a clearer result.</p>
			</div>
		</div>
	);
};

export default PerformanceBanner;
