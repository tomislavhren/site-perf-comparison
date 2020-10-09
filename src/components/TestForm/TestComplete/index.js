import React from 'react';
import IconButtonWithTooltip from '../../IconButtonWithTooltip';

const getAttemptString = num => {
	const numString = num.toString();
	const lastChar = numString[numString.length - 1];
	switch (lastChar) {
		case '1':
			return `${numString}st`;
		case '2':
			return `${numString}nd`;
		case '3':
			return `${numString}rd`;
		default:
			return `${numString}th`;
	}
};

const TestComplete = ({ attemptNumber }) => {
	const attempt = getAttemptString(attemptNumber);

	return (
		<ul className="test__setup">
			<li>
				Test Complete <i className="fal fa-check color color--limeade margin margin--l-xxs"></i>
			</li>
			<li>
				{attempt} load{' '}
				<IconButtonWithTooltip
					tooltipId="tooltip--first-load"
					tooltipTitle={`${attempt} load`}
					tooltipText="It's always better to run the test more than once to get a more accurate record, the first load is always slowest because the cache is just getting built up, most of the gains start after the second load."
				>
					<i className="fal fa-question-circle"></i>
				</IconButtonWithTooltip>
			</li>
		</ul>
	);
};

export default TestComplete;
