import React from 'react';
import './setupSuccessful.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../Tooltip';

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

const SetupSuccessful = ({ attemptNumber }) => {
	const attempt = getAttemptString(attemptNumber);

	return (
		<div className="setup-successful">
			Setup Successful{' '}
			<FontAwesomeIcon
				className="setup-successful__check-icon"
				icon={faCheck}
			/>
			<div className="divider" />
			<span className="setup-successful__attempt">
				{attempt} load{' '}
				<Tooltip text="Placeholder text" label={`${attempt} load`}>
					<FontAwesomeIcon
						className="setup-successful__helper-icon"
						icon={faQuestionCircle}
					/>
				</Tooltip>
			</span>
		</div>
	);
};

export default SetupSuccessful;
