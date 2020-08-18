import React from 'react';
import './App.css';
import * as service from './service';
import PageTiming from './PageTiming';
import pageTimingData1 from './pageTiming1.json';
import pageTimingData2 from './pageTiming2.json';
import * as utils from './utils';
import PerformanceBanner from './PerformanceBanner';

function App() {
  const inputRef = React.useRef(null);
  const [logs, setLogs] = React.useState([]);
  // const [realWebsitePageTimings, setRealWebsitePageTimings] = React.useState(pageTimingData1.output);
  // const [clonedWebsitePageTimings, setClonedWebsitePageTimings] = React.useState(pageTimingData2.output);
  const [realWebsitePageTimings, setRealWebsitePageTimings] = React.useState(null);
  const [clonedWebsitePageTimings, setClonedWebsitePageTimings] = React.useState(null);
  
  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    const url = inputRef.current && inputRef.current.value;
    if(!url) {
      return;
    }
    
    const logs = [];
    const addLogEntry = (entry) => {
      logs.push(entry);
      setLogs([...logs]);
    };

    addLogEntry(`Cloning website: ${url}`);
    const clonedWebsiteUrl = await service.cloneWebsite(url);
    addLogEntry(`Website cloned successfully`);

    addLogEntry(`Creating a performance test job for: ${url}`);
    const realWebsiteJobId = await service.createPerformanceTestJob(url);
    addLogEntry(`Performance test job created successfully.`);
    
    addLogEntry(`Creating a performance test job for: ${clonedWebsiteUrl}`);
    const clonedWebsiteJobId = await service.createPerformanceTestJob(clonedWebsiteUrl);
    addLogEntry(`Performance test job created successfully.`);

    addLogEntry(`Running tests for ${url}.`);
    addLogEntry(`Running tests for ${clonedWebsiteUrl}.`);

    setTimeout(async () => {
      const realWebsiteResaults = await service.getPerformanceResultsByJobId(realWebsiteJobId);
      addLogEntry(`Test for ${url} completed successfully.`);
      const clonedWebsiteResaults = await service.getPerformanceResultsByJobId(clonedWebsiteJobId);
      addLogEntry(`Test for ${clonedWebsiteUrl} completed successfully.`);
      
      const realWebsitePageTimings = realWebsiteResaults.output;
      const clonedWebsitePageTimings = clonedWebsiteResaults.output;

      setClonedWebsitePageTimings(clonedWebsitePageTimings)
      setRealWebsitePageTimings(realWebsitePageTimings)
      setLogs([]);
    }, 20000);

  }, [setLogs]);

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
       {logs && logs.length > 0 && 
          <div className="logs">
            <div className="logs-title">Test Sequence:</div>
            <ul>
              {logs.map((l, index) => 
                <li className="log-entry" key={`entry${index}`}>{l}</li>
              )}
            </ul>
          </div>
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
