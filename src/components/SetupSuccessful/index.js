import React from 'react';
import './setupSuccessful.css';

const getAttemptString = (num) => {
    const numString = num.toString();
    const lastChar = numString[numString.length - 1];
    switch (lastChar) {
        case '1': return `${numString}st`;
        case '2': return `${numString}nd`;
        case '3': return `${numString}rd`;
        default: return `${numString}th`;
    }
}

const SetupSuccessful = ({ attemptNumber }) => {
    const attempt = getAttemptString(attemptNumber);

    return (
        <div className="setup-successful">
            Setup Successful <span className="material-icons text-success">check</span>
            <div className="divider" />
            <span className="setup-successful__attempt">
                {attempt} load
                <div className="icon tooltip">
                    <span className="material-icons">help_outline</span>
                    <span className="tooltip__text">
                        Placeholder text
                    </span>
                </div>
            </span>
        </div>
    );   
};

export default SetupSuccessful;