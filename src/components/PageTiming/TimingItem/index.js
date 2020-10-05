import React from 'react';
import { toPercentageString } from '../../../core/utils';
import IconButtonWithTooltip from '../../IconButtonWithTooltip';

const TimingItem = ({
	result,
	label,
	tooltipId,
	tooltipTitle,
	tooltipText,
	percentageDiff,
	highlighted,
	positiveLabel = 'faster',
	negativeLabel = 'slower',
}) => {
	const renderDiff = React.useCallback(() => {
		if (!percentageDiff) {
			return null;
		}
		const isFaster = percentageDiff <= 0;
		const className = [
			'card__gtmetrix-percentage',
			isFaster
				? 'card__gtmetrix-percentage--limeade'
				: 'card__gtmetrix-percentage--milano-red',
		].join(' ');

		return (
			<span className={className}>
				{toPercentageString(percentageDiff)}{' '}
				{isFaster ? positiveLabel : negativeLabel}
			</span>
		);
	}, [percentageDiff, positiveLabel, negativeLabel]);

	return (
		<ul className="card__gtmetrix-results-result">
			<li>
				<span className={highlighted ? 'color color--curious-blue' : ''}>
					{result}
				</span>
			</li>
			<li>
				{label}
				<IconButtonWithTooltip
					tooltipTitle={tooltipTitle}
					tooltipText={tooltipText}
					tooltipId={tooltipId}
				>
					<i className="fal fa-question-circle" />
				</IconButtonWithTooltip>
			</li>
			<li>{renderDiff()}</li>
		</ul>
	);
};

export default TimingItem;
