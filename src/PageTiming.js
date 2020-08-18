import React from 'react';
import './pageTiming.css';
import TimingItem from './TimingItem';
import ServerInfo from './ServerInfo';
import { calculateDiffPercentage } from './utils';

const PageTiming = ({
    videoSrc,
    ttfb,
    ttfb2,
    firstPaint,
    firstPaint2,
    pageLoadTime,
    pageLoadTime2,
    serverName,
    serverLocation,
}) => {
    return (
        <div className="page-timings">

            <ServerInfo name={serverName} location={serverLocation} />

            {ttfb && firstPaint && pageLoadTime &&
                <div className="timing-results">
                    <TimingItem result={ttfb} label="TTFB" percentageDiff={calculateDiffPercentage(ttfb, ttfb2)} tooltipLabel="Time to first byte" tooltipText="Time to first byte is one of the most popular measurements used as an indication of the responsivenes of a webserver or other network resource" />
                    <TimingItem result={firstPaint} percentageDiff={calculateDiffPercentage(firstPaint, firstPaint2)} label="First Paint" tooltipLabel="First Paint" tooltipText="First Paint measures the time from navigation to the time when the browser renders the first bit of content from the DOM." />
                    <TimingItem result={pageLoadTime} percentageDiff={calculateDiffPercentage(pageLoadTime, pageLoadTime2)} label="Page Load Time" />
                </div>
            }

            {videoSrc && <video style={{ background: '#EFE5E5' }} autoPlay width="100%" height="auto" src={`//${videoSrc}`}></video>}
        </div>
    )
}

export default PageTiming;