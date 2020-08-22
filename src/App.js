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

const wait = (s) => new Promise(resolve => setTimeout(resolve, s*1000));

function App() {
  // const [realWebsitePageTimings, setRealWebsitePageTimings] = React.useState(pageTimingData1.output);
  // const [clonedWebsitePageTimings, setClonedWebsitePageTimings] = React.useState(pageTimingData2.output);
  const timer = React.useRef();

  const [url, setUrl] = React.useState('');
  const [setupSuccessful, setSetupSuccessful] = React.useState(false);
  const [testAttempt, setTestAttempt] = React.useState({});
  
  const [realWebsitePageTimings, setRealWebsitePageTimings] = React.useState(null);
  const [clonedWebsitePageTimings, setClonedWebsitePageTimings] = React.useState(null);
  const [testSequenceProgress, setTestSequenceProgress] = React.useState(defaultTestSequenceProgress);
  
  const handleOnTimerMount = React.useCallback((el) => {
    timer.current = el;
  }, []);

  const handleInputChange = React.useCallback(e => {
    setUrl(e.target.value);
  }, [setUrl])

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    const { origin } = new URL(url);
    if(!origin || origin === 'null') {
      console.error(`Something is wrong with the URL: ${url}`)
      return;
    }

    setSetupSuccessful(false);
    setRealWebsitePageTimings(null);
    setClonedWebsitePageTimings(null);
    setTestSequenceProgress({ ...defaultTestSequenceProgress });

    const updateTestSequenceProgress = (key, status) => {
      setTestSequenceProgress(prevState => ({ ...prevState, [key]: status }));
    };

    setTestAttempt(prev => ({...prev, [url]: prev[url] ? prev[url] + 1 : 1 }));

    updateTestSequenceProgress(testSequence.VERIFY_URL, testSequenceStatus.IN_PROGRESS);
    const clonedWebsiteUrl = await service.cloneWebsite(origin);
    const realWebsiteJobId = await service.createPerformanceTestJob(origin);
    const clonedWebsiteJobId = await service.createPerformanceTestJob(clonedWebsiteUrl);
    updateTestSequenceProgress(testSequence.VERIFY_URL, testSequenceStatus.DONE);

    updateTestSequenceProgress(testSequence.DOWNLOAD_HTML, testSequenceStatus.IN_PROGRESS);
    await wait(5);
    updateTestSequenceProgress(testSequence.DOWNLOAD_HTML, testSequenceStatus.DONE);

    updateTestSequenceProgress(testSequence.DOWNLOAD_ASSETS, testSequenceStatus.IN_PROGRESS);
    await wait(7);
    updateTestSequenceProgress(testSequence.DOWNLOAD_ASSETS, testSequenceStatus.DONE);

    updateTestSequenceProgress(testSequence.OPTIMIZE_ASSETS, testSequenceStatus.IN_PROGRESS);
    await wait(5);
    updateTestSequenceProgress(testSequence.OPTIMIZE_ASSETS, testSequenceStatus.DONE);

    updateTestSequenceProgress(testSequence.INIT_CLONED_SITE, testSequenceStatus.IN_PROGRESS);
    await wait(1);
    updateTestSequenceProgress(testSequence.INIT_CLONED_SITE, testSequenceStatus.DONE);

    updateTestSequenceProgress(testSequence.START_TIMER, testSequenceStatus.IN_PROGRESS);
    timer.current.startTimer();

    setTimeout(async () => {
      const realWebsiteResaults = await service.getPerformanceResultsByJobId(realWebsiteJobId);
      const clonedWebsiteResaults = await service.getPerformanceResultsByJobId(clonedWebsiteJobId);
      
      const realWebsitePageTimings = realWebsiteResaults.output;
      const clonedWebsitePageTimings = clonedWebsiteResaults.output;

      updateTestSequenceProgress(testSequence.START_TIMER, testSequenceStatus.DONE);
      timer.current.resetTimer();
      setSetupSuccessful(true);

      setClonedWebsitePageTimings(clonedWebsitePageTimings);
      setRealWebsitePageTimings(realWebsitePageTimings);
    }, 10000);

  }, [url, setSetupSuccessful, setClonedWebsitePageTimings, setRealWebsitePageTimings]);

  const clonedWebsiteProps = utils.getWebsitePerformanceProps(clonedWebsitePageTimings);
  const realWebsiteProps = utils.getWebsitePerformanceProps(realWebsitePageTimings);

  const attemptNumber = testAttempt[url] || 0;
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-url">
          <input value={url} onChange={handleInputChange} className="input" placeholder="Enter URL to test" type="text" name="url" />
          <button type="submit" className="run-test">
            <span className="material-icons">timer</span>
            {attemptNumber > 0 ? 'Rerun test' : 'Run test'}
          </button>
        </div>
        {!setupSuccessful ?
          <>
            <TestSequence testSequenceProgress={testSequenceProgress} />
            <Timer onMount={handleOnTimerMount} />
          </> :
          <SetupSuccessful attemptNumber={attemptNumber} />
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
