import React from 'react';
import './App.css';
import PageTiming from './components/PageTiming';
import * as utils from './core/utils';
import PerformanceBanner from './components/PerformanceBanner';
import TestForm from './components/TestForm';
import rocketImg from './assets/rocket.svg';

const App = () => {
	const [performance, setPerformance] = React.useState({
		cloned: null,
		original: null,
	});

	const handleSuccess = React.useCallback(
		(originalSitePerformanceResults, clonedSitePerformanceResults) => {
			const { cloned, original } = utils.extractPerformanceProps(
				originalSitePerformanceResults,
				clonedSitePerformanceResults
			);
			setPerformance({
				cloned,
				original,
			});
		},
		[setPerformance]
	);

	const handleStart = React.useCallback(() => {
		setPerformance({
			cloned: null,
			original: null,
		});
	}, [setPerformance]);

	return (
		<div className="App">
			<TestForm onSuccess={handleSuccess} onStart={handleStart} />

			{performance.cloned && performance.original && (
				<PerformanceBanner
					diff={utils.calculateDiffPercentage(
						performance.cloned.pageLoadTime.data,
						performance.original.pageLoadTime.data
					)}
				/>
			)}

			<div className="page-timings-container">
				<PageTiming
					serverName="Rocket"
					serverLocation="Atlanta, Georgia, USA"
					serverImgSrc={rocketImg}
					data={performance.cloned}
					highlighted
				/>
				<PageTiming data={performance.original} />
			</div>
		</div>
	);
};

export default App;
