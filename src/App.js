import React from 'react';
import './App.css';
import * as service from './core/service';
import PageTiming from './components/PageTiming';
import * as utils from './core/utils';
import PerformanceBanner from './components/PerformanceBanner';
import TestSequence from './components/TestSequence';
import Timer from './components/Timer';
import SetupSuccessful from './components/SetupSuccessful';
import { testSequence, testSequenceStatus } from './core/constants';

const defaultTestSequenceProgress = Object.keys(testSequence).reduce((acc, key) => Object.assign(acc, { [key]: testSequenceStatus.PENDING }), {});

function App() {
  const timer = React.useRef();

  const [originalUrl, setOriginalUrl] = React.useState('');
  const [clonedUrl, setClonedUrl] = React.useState('');

  const [originalUrlPerformance, setOriginalUrlPerformance] = React.useState(null);
  const [clonedUrlPerformance, setClonedUrlPerformance] = React.useState(null);
  
  const [testInProgress, setTestInProgress] = React.useState(false);
  const [setupSuccessful, setSetupSuccessful] = React.useState(false);
  const [testAttempt, setTestAttempt] = React.useState({});
  
  const [testSequenceProgress, setTestSequenceProgress] = React.useState(defaultTestSequenceProgress);
  
  const handleOnTimerMount = React.useCallback((el) => {
    timer.current = el;
  }, []);

  const handleInputChange = React.useCallback(e => {
    setOriginalUrl(e.target.value);
  }, [setOriginalUrl])

  const incrementTestAttempt = React.useCallback(() => {
    setTestAttempt(prev => ({...prev, [originalUrl]: prev[originalUrl] ? prev[originalUrl] + 1 : 1 }));
  }, [originalUrl, setTestAttempt]);

  const handleRunTest = React.useCallback(async (e) => {
    e.preventDefault();

    // Check the URL is legit
    const { origin } = new URL(originalUrl);
    if(!origin || origin === 'null') {
      console.error(`Something is wrong with the URL: ${originalUrl}`)
      return;
    }

    setTestInProgress(true);

    // Reset everything
    setSetupSuccessful(false);
    setOriginalUrlPerformance(null);
    setClonedUrlPerformance(null);
    setTestSequenceProgress({ ...defaultTestSequenceProgress });


    // Helper methods
    const updateTestSequenceProgress = (key, status) => {
      setTestSequenceProgress(prevState => ({ ...prevState, [key]: status }));
    };

    const waitAndUpdateTestSequenceProgress = async (key, time) => {
      updateTestSequenceProgress(key, testSequenceStatus.IN_PROGRESS);
      await utils.wait(time);
      updateTestSequenceProgress(key, testSequenceStatus.DONE);
    };

    // Attempt is shown below the input after the test is run for the 1st time
    incrementTestAttempt();

    updateTestSequenceProgress(testSequence.VERIFY_URL, testSequenceStatus.IN_PROGRESS);
    
    const clonedWebsiteUrl = await service.cloneWebsite(origin);
    setClonedUrl(clonedWebsiteUrl);

    const realWebsiteJobId = await service.createPerformanceTestJob(origin);
    const clonedWebsiteJobId = await service.createPerformanceTestJob(clonedWebsiteUrl);
    updateTestSequenceProgress(testSequence.VERIFY_URL, testSequenceStatus.DONE);

    // UX only, no logic
    await waitAndUpdateTestSequenceProgress(testSequence.DOWNLOAD_HTML, 5);
    await waitAndUpdateTestSequenceProgress(testSequence.DOWNLOAD_ASSETS, 7);
    await waitAndUpdateTestSequenceProgress(testSequence.OPTIMIZE_ASSETS, 5);
    await waitAndUpdateTestSequenceProgress(testSequence.INIT_CLONED_SITE, 1);

    updateTestSequenceProgress(testSequence.START_TIMER, testSequenceStatus.IN_PROGRESS);
    timer.current.startTimer();

    // Try to get tests after 10s so we don't ping server too many times
    setTimeout(async () => {
      const originalUrlResults = await service.getPerformanceResultsByJobId(realWebsiteJobId);
      const clonedUrlResults = await service.getPerformanceResultsByJobId(clonedWebsiteJobId);

      updateTestSequenceProgress(testSequence.START_TIMER, testSequenceStatus.DONE);
      timer.current.resetTimer();
      setSetupSuccessful(true);

      setOriginalUrlPerformance(originalUrlResults.output);
      setClonedUrlPerformance(clonedUrlResults.output);

      setTestInProgress(false);
    }, 10000);

  }, [originalUrl, incrementTestAttempt, setSetupSuccessful, setOriginalUrlPerformance, setClonedUrlPerformance]);

  const handleRerunTest = React.useCallback(async (e) => {
    e.preventDefault();
   
    const { origin: originalOrigin } = new URL(originalUrl);
    const { origin: clonedOrigin } = new URL(clonedUrl);
    if(!originalOrigin || originalOrigin === 'null') {
      console.error(`Something is wrong with the URL: ${originalUrl}`)
      return;
    }

    setTestInProgress(true);

    setOriginalUrlPerformance(null);
    setClonedUrlPerformance(null);

    incrementTestAttempt();

    const originalUrlJobId = await service.createPerformanceTestJob(originalOrigin);
    const clonedUrlJobId = await service.createPerformanceTestJob(clonedOrigin);

    setTimeout(async () => {
      const originalUrlResaults = await service.getPerformanceResultsByJobId(originalUrlJobId);
      const clonedUrlResault = await service.getPerformanceResultsByJobId(clonedUrlJobId);
      
      setOriginalUrlPerformance(originalUrlResaults.output);
      setClonedUrlPerformance(clonedUrlResault.output);

      setTestInProgress(false);
    }, 10000);

  }, [originalUrl, clonedUrl, incrementTestAttempt, setOriginalUrlPerformance, setClonedUrlPerformance]);

  const originalUrlTimingProps = utils.getWebsitePerformanceProps(originalUrlPerformance) || {};
  const clonedUrlTimingProps = utils.getWebsitePerformanceProps(clonedUrlPerformance) || {};
  const attemptNumber = testAttempt[originalUrl] || 0;

  return (
    <div className="App">
      <form onSubmit={attemptNumber > 0 ? handleRerunTest : handleRunTest} className="form">
        <div className="input-url">
          <input value={originalUrl} onChange={handleInputChange} className="input" placeholder="Enter URL to test" type="url" name="url" />
          <button disabled={testInProgress} type="submit" className="run-test">
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
      
      {!utils.isEmpty(originalUrlTimingProps) && !utils.isEmpty(clonedUrlTimingProps) && 
        <PerformanceBanner diff={utils.calculateDiffPercentage(clonedUrlTimingProps.pageLoadTime, originalUrlTimingProps.pageLoadTime)} />
      }
      <div className="page-timings-container">
        <PageTiming
          serverName="Rocket"
          serverLocation="Atlanta, Georgia, USA"
          ttfb={clonedUrlTimingProps.ttfb}
          firstPaint={clonedUrlTimingProps.firstPaint}
          pageLoadTime={clonedUrlTimingProps.pageLoadTime}
          ttfb2={originalUrlTimingProps.ttfb}
          firstPaint2={originalUrlTimingProps.firstPaint}
          pageLoadTime2={originalUrlTimingProps.pageLoadTime}
        />
        <PageTiming 
          serverName="TBD"
          serverLocation="TBD"
          ttfb={originalUrlTimingProps.ttfb}
          firstPaint={originalUrlTimingProps.firstPaint}
          pageLoadTime={originalUrlTimingProps.pageLoadTime}
        />
      </div>
      
    </div>
  );
}

export default App;
