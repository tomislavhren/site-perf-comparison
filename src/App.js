import React from 'react';
import './App.css';
import * as service from './service';
import PageTiming from './PageTiming';
import pageTimingData1 from './pageTiming1.json';
import pageTimingData2 from './pageTiming2.json';
import * as utils from './utils';
import PerformanceBanner from './PerformanceBanner';
import TestSequence from './TestSequence';
import Timer from './Timer';
import SetupSuccessful from './SetupSuccessful';
import { testSequence, testSequenceStatus } from './constants';

const defaultTestSequenceProgress = Object.keys(testSequence).reduce((acc, key) => Object.assign(acc, { [key]: testSequenceStatus.PENDING }), {});


function App() {
  const inputRef = React.useRef(null);
  const timer = React.useRef();
  // const [realWebsitePageTimings, setRealWebsitePageTimings] = React.useState(pageTimingData1.output);
  // const [clonedWebsitePageTimings, setClonedWebsitePageTimings] = React.useState(pageTimingData2.output);
  const [realWebsitePageTimings, setRealWebsitePageTimings] = React.useState(null);
  const [clonedWebsitePageTimings, setClonedWebsitePageTimings] = React.useState(null);
  const [testSequenceProgress, setTestSequenceProgress] = React.useState(defaultTestSequenceProgress);
  const [setupSuccessful, setSetupSuccessful] = React.useState(false);

  const handleOnTimerMount = React.useCallback((controls) => {
    timer.current = controls
  }, []);

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    const url = inputRef.current && inputRef.current.value;
    if(!url) {
      return;
    }

    const updateTestSequenceProgress = (key, status) => {
      setTestSequenceProgress(prevState => ({ ...prevState, [key]: status }));
    };

    updateTestSequenceProgress(testSequence.VERIFY_URL, testSequenceStatus.IN_PROGRESS);
    updateTestSequenceProgress(testSequence.DOWNLOAD_ASSETS, testSequenceStatus.IN_PROGRESS);
    updateTestSequenceProgress(testSequence.DOWNLOAD_HTML, testSequenceStatus.IN_PROGRESS);
    utils.log(`Cloning website: ${url}`);
    const clonedWebsiteUrl = await service.cloneWebsite(url);
    updateTestSequenceProgress(testSequence.VERIFY_URL, testSequenceStatus.DONE);
    updateTestSequenceProgress(testSequence.DOWNLOAD_ASSETS, testSequenceStatus.DONE);
    updateTestSequenceProgress(testSequence.DOWNLOAD_HTML, testSequenceStatus.DONE);
    utils.log(`Website cloned successfully`);

    updateTestSequenceProgress(testSequence.OPTIMIZE_ASSETS, testSequenceStatus.IN_PROGRESS);
    updateTestSequenceProgress(testSequence.OPTIMIZE_ASSETS, testSequenceStatus.DONE);

    updateTestSequenceProgress(testSequence.INIT_CLONED_SITE, testSequenceStatus.IN_PROGRESS);

    utils.log(`Creating a performance test job for: ${url}`);
    const realWebsiteJobId = await service.createPerformanceTestJob(url);
    utils.log(`Performance test job created successfully.`);
    
    utils.log(`Creating a performance test job for: ${clonedWebsiteUrl}`);
    const clonedWebsiteJobId = await service.createPerformanceTestJob(clonedWebsiteUrl);
    utils.log(`Performance test job created successfully.`);

    updateTestSequenceProgress(testSequence.INIT_CLONED_SITE, testSequenceStatus.DONE);

    utils.log(`Running tests for ${url}.`);
    utils.log(`Running tests for ${clonedWebsiteUrl}.`);

    updateTestSequenceProgress(testSequence.START_TIMER, testSequenceStatus.IN_PROGRESS);
    timer.current.startTimer();

    setTimeout(async () => {
      const realWebsiteResaults = await service.getPerformanceResultsByJobId(realWebsiteJobId);
      utils.log(`Test for ${url} completed successfully.`);
      const clonedWebsiteResaults = await service.getPerformanceResultsByJobId(clonedWebsiteJobId);
      utils.log(`Test for ${clonedWebsiteUrl} completed successfully.`);
      
      const realWebsitePageTimings = realWebsiteResaults.output;
      const clonedWebsitePageTimings = clonedWebsiteResaults.output;

      updateTestSequenceProgress(testSequence.START_TIMER, testSequenceStatus.DONE);
      timer.current.resetTimer();
      setSetupSuccessful(true);

      setClonedWebsitePageTimings(clonedWebsitePageTimings)
      setRealWebsitePageTimings(realWebsitePageTimings)
    }, 20000);

  }, [setSetupSuccessful, setClonedWebsitePageTimings, setRealWebsitePageTimings]);

  const clonedWebsiteProps = utils.getWebsitePerformanceProps(clonedWebsitePageTimings);
  const realWebsiteProps = utils.getWebsitePerformanceProps(realWebsitePageTimings);

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-url">
          <input ref={inputRef} className="input" placeholder="Enter URL to test" type="text" name="url" />
          <button type="submit" className="run-test">
            <span className="material-icons">timer</span>
            Run test
          </button>
        </div>
        {!setupSuccessful ?
          <>
            <TestSequence testSequenceProgress={testSequenceProgress} />
            <Timer onMount={handleOnTimerMount} />
          </> :
          <SetupSuccessful />
        }
      </form>

      
      {realWebsiteProps && clonedWebsiteProps ?
        <>
          <PerformanceBanner diff={utils.calculateDiffPercentage(clonedWebsiteProps.pageLoadTime, realWebsiteProps.pageLoadTime)} />
          <div className="page-timings-container">
            <PageTiming
              serverName="Rocket"
              serverLocation="Atlanta, Georgia, USA"
              {...clonedWebsiteProps}
              ttfb2={realWebsiteProps.ttfb}
              firstPaint2={realWebsiteProps.firstPaint}
              pageLoadTime2={realWebsiteProps.pageLoadTime}
            />
            <PageTiming 
              serverName="TBD"
              serverLocation="TBD"
              {...realWebsiteProps}
            />
          </div>
        </> :
        <div className="page-timings-container">
          <PageTiming
            serverName="Rocket"
            serverLocation="Atlanta, Georgia, USA"
          />
          <PageTiming 
            serverName="TBD"
            serverLocation="TBD"
          />
        </div>
      }
    </div>
  );
}

export default App;
