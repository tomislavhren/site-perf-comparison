import React from 'react';
import './App.css';
import * as service from './service';

function App() {
  const inputRef = React.useRef(null);
  const [logs, setLogs] = React.useState([]);
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
      
      const realWebsitePageTimings = realWebsiteResaults.output.har.log.pages[0];
      const clonedWebsitePageTimings = clonedWebsiteResaults.output.har.log.pages[0];

      setClonedWebsitePageTimings(clonedWebsitePageTimings)
      setRealWebsitePageTimings(realWebsitePageTimings)
      setLogs([]);
    }, 30000);

  }, [setLogs]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-url">
          <input ref={inputRef} className="input" placeholder="Enter URL to test" type="text" name="url" />
          <button type="submit" className="run-test">Run test</button>
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
        {realWebsitePageTimings && clonedWebsitePageTimings &&
          <div className="page-timings-container">
            <div className="page-timings">
              URL: <strong>{realWebsitePageTimings._url}</strong>
              <ul>
                {Object.keys(realWebsitePageTimings.pageTimings).map((key) => (
                  <li key={`real-${key}`}>{key}: <strong>{realWebsitePageTimings.pageTimings[key]}</strong></li>
                ))}
              </ul>
            </div>
            <div className="page-timings">
              URL: <strong>{clonedWebsitePageTimings._url}</strong>
              <ul>
                {Object.keys(clonedWebsitePageTimings.pageTimings).map((key) => (
                  <li key={`cloned-${key}`}>{key}: <strong>{clonedWebsitePageTimings.pageTimings[key]}</strong></li>
                ))}
              </ul>
            </div>
          </div>
        }
      </form>
    </div>
  );
}

export default App;
