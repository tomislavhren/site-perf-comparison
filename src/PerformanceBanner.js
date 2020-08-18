import React from 'react';
import { toPercentageString } from './utils';

const PerformanceBanner = ({ diff }) => {
    return (
        <div className="performance-banner">
            <div className="performance-banner__title">Your site loaded <span className={diff > 0 ? 'text-success' : 'text-danger'}>{toPercentageString(diff)} {diff > 0 ? 'faster' : 'slower'} on Rocket!</span></div>
            <div className="performance-banner__subTitle">We recommend running the test several times for a clearer result.</div>
        </div>
    );
};

export default PerformanceBanner