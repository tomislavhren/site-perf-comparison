import React from 'react';
import { toPercentageString } from './utils';

const TimingItem = ({
    result,
    label,
    tooltipLabel,
    tooltipText,
    percentageDiff,
}) => {

    const renderDiff = React.useCallback(() => {
        if(!percentageDiff) {
            return <div className="timing-item__diff">-</div>
        }

        return (
            <div className={`timing-item__diff timing-item__diff--${percentageDiff > 0 ? 'positive' : 'negative'}`}>
                {toPercentageString(percentageDiff)} {percentageDiff > 0 ? 'faster' : 'slower'}
            </div>
        )
    }, [percentageDiff])

    return (
        <div className="timing-item">
            <div className="timing-item__result">{result} ms</div>
            <div className="timing-item__label">
                <span>{label}</span>
                {tooltipText &&
                    <div className="icon tooltip">
                        <span className="material-icons">help_outline</span>
                        <span className="tooltip__text">
                            {tooltipLabel && <label><strong>{tooltipLabel}</strong></label>}
                            <div>{tooltipText}</div>
                        </span>
                    </div>
                }     
            </div>
            {renderDiff()}
        </div>
    );
}

export default TimingItem;