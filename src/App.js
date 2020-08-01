import React from 'react';
import './App.css';
import * as service from './service';

function App() {
  const inputRef = React.useRef(null);
  const [logs, setLogs] = React.useState([]);

  
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
      await service.getPerformanceResultsByJobId(realWebsiteJobId);
      addLogEntry('Test completed successfully.');
      await service.getPerformanceResultsByJobId(clonedWebsiteJobId);
      addLogEntry('Test completed successfully.');
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
              {logs.map(l => 
                <li className="log-entry" key={l}>{l}</li>
              )}
            </ul>
          </div>
        }
      </form>
    </div>
  );
}

export default App;
