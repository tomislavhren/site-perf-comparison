import React from 'react';
import { toPercentageString } from '../../../core/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../../Tooltip';
import './timingItem.css';

const TimingItem = ({
	result,
	label,
	tooltipLabel,
	tooltipText,
	percentageDiff,
	highlighted,
}) => {
	const renderDiff = React.useCallback(() => {
		if (!percentageDiff) {
			return <div className="timing-item__diff">-</div>;
		}
		const isFaster = percentageDiff <= 0;
		return (
			<div
				className={`timing-item__diff timing-item__diff--${
					isFaster ? 'positive' : 'negative'
				}`}
			>
				{toPercentageString(percentageDiff)} {isFaster ? 'faster' : 'slower'}
			</div>
		);
	}, [percentageDiff]);

	return (
		<div className="timing-item">
			<div
				className={`timing-item__result ${
					highlighted ? 'timing-item__result--highlighted' : ''
				}`}
			>
				{result || '-'}
			</div>
			<div className="timing-item__label">
				{label}
				{tooltipText && (
					<Tooltip text={tooltipText} label={tooltipLabel}>
						<FontAwesomeIcon
							className="timing-item__helper-icon"
							icon={faQuestionCircle}
						/>
					</Tooltip>
				)}
			</div>
			{renderDiff()}
		</div>
	);
};

export default TimingItem;
