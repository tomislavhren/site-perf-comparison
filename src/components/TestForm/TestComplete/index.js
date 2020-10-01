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
				Test Complete{' '}
				<i class="fal fa-check color color--limeade margin margin--l-xxs"></i>
			</li>
			<li>
				{attempt} load{' '}
				<IconButtonWithTooltip
					tooltipTitle={`${attempt} load`}
					tooltipText="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam eaque doloribus, libero cupiditate ullam molestiae minus deserunt soluta nesciunt."
				>
					<i class="fal fa-question-circle"></i>
				</IconButtonWithTooltip>
			</li>
		</ul>
	);
};

export default TestComplete;
