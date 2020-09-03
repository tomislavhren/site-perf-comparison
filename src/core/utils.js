export const getWebsitePerformanceProps = (performanceData) => {
    if(!performanceData) {
        return null;
    }
    
    const videoSrc = performanceData.video;
    const ttfb = performanceData.statistics.timings.pageTimings.backEndTime.median;
    const firstPaint = performanceData.statistics.timings.firstPaint.median;
    const pageLoadTime = performanceData.statistics.timings.pageTimings.pageLoadTime.median;

    return {
        videoSrc,
        ttfb,
        firstPaint,
        pageLoadTime
    };
};

export const calculateDiffPercentage = (oldValue, newValue) => {
    if(!newValue) {
        return null;
    }

    return (newValue - oldValue) / newValue;
};

export const toPercentageString = (val) => {
    if(!val) {
        return;
    }

    const perc = Math.abs(Math.round(val*100));
    return `${perc}%`;
};

export const log = (entry) => {
    process.env.NODE_ENV === 'development' && console.log(entry);
}

export const isEmpty = (obj = {}) => Object.keys(obj).length === 0;

export const wait = delay => new Promise(resolve => setTimeout(resolve, delay * 1000));
