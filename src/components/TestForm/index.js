import React from 'react';
import * as service from '../../core/service';
import * as utils from '../../core/utils';
import {
	testSequence,
	TestProgressStatus,
	initialTestProgress,
	rerunTestProgress,
} from '../../core/constants';
import TestProgressList from './TestProgressList';
import TestComplete from './TestComplete';
import * as qs from 'query-string';
import Form from './Form';
import PerformanceBanner from './PerformanceBanner';

const getInitialUrl = () => {
	const { url: initialUrl = '' } = qs.parse(window.location.search);
	const trimmedUrl = initialUrl.trim();
	if (!trimmedUrl) {
		return '';
	}

	return /^https?:\/\/.+/.test(trimmedUrl)
		? trimmedUrl
		: `https://${trimmedUrl}`;
};

const TestForm = ({ onStart, onSuccess }) => {
	const [originalUrl, setOriginalUrl] = React.useState();
	const [clonedUrl, setClonedUrl] = React.useState();

	const [pageLoadTimeDiff, setPageLoadTimeDiff] = React.useState();
	const [isTestInProgress, setIsTestInProgress] = React.useState(false);
	const [isTestComplete, setIsTestComplete] = React.useState(false);
	const testAttemptRef = React.useRef({});

	const [testSequenceProgress, setTestSequenceProgress] = React.useState({
		...initialTestProgress,
	});

	const handleRunTest = React.useCallback(
		async url => {
			onStart();

			// Helper methods
			const updateTestSequenceProgress = (key, status) => {
				setTestSequenceProgress(prevState => ({
					...prevState,
					[key]: status,
				}));
			};

			const waitAndUpdateTestSequenceProgress = async (key, time) => {
				updateTestSequenceProgress(key, TestProgressStatus.IN_PROGRESS);
				await utils.wait(time);
				updateTestSequenceProgress(key, TestProgressStatus.DONE);
			};

			const incrementTestAttempt = url => {
				testAttemptRef.current[url] = testAttemptRef.current[url]
					? testAttemptRef.current[url] + 1
					: 1;
				return testAttemptRef.current[url];
			};

			// 1. save the original url
			setOriginalUrl(url);

			// 2. increase attempt number for the url
			const isRerun = incrementTestAttempt(url) > 1;

			// 3. disable the button to prevent running test
			// already in progress
			setIsTestInProgress(true);

			// 4. reset to initial state if it's not a rerun
			setIsTestComplete(false);
			setTestSequenceProgress({
				...(isRerun ? rerunTestProgress : initialTestProgress),
			});

			let clonedWebsiteUrl = clonedUrl;
			if (!isRerun) {
				updateTestSequenceProgress(
					testSequence.VERIFY_URL,
					TestProgressStatus.IN_PROGRESS
				);
				clonedWebsiteUrl = await service.cloneWebsite(url);
				setClonedUrl(clonedWebsiteUrl);

				updateTestSequenceProgress(
					testSequence.VERIFY_URL,
					TestProgressStatus.DONE
				);

				// UX only, no logic
				//await waitAndUpdateTestSequenceProgress(testSequence.DOWNLOAD_HTML, 5);
				//await waitAndUpdateTestSequenceProgress(
				//	testSequence.DOWNLOAD_ASSETS,
				//	7
				//);
				//await waitAndUpdateTestSequenceProgress(
				//	testSequence.OPTIMIZE_ASSETS,
				//	5
				//);
				//await waitAndUpdateTestSequenceProgress(
				//	testSequence.INIT_CLONED_SITE,
				//	1
				//);
			}

			updateTestSequenceProgress(
				testSequence.PERFORMING_TEST,
				TestProgressStatus.IN_PROGRESS
			);
			const [
				originalWebsitePerformanceResults,
				clonedWebsitePerformanceResults,
			] = await Promise.all([
				service.fetchPerformanceResults(url),
				service.fetchPerformanceResults(clonedWebsiteUrl),
			]);
			updateTestSequenceProgress(
				testSequence.PERFORMING_TEST,
				TestProgressStatus.DONE
			);

			// Shows "Your site is X% faster" banner
			setIsTestComplete(true);
			// Enables run button
			setIsTestInProgress(false);

			const { cloned, original } = utils.extractPerformanceProps(
				originalWebsitePerformanceResults,
				clonedWebsitePerformanceResults
			);

			const pageLoadTimeDiff = utils.calculateDiffPercentage(
				cloned.pageLoadTime.data,
				original.pageLoadTime.data
			);
			setPageLoadTimeDiff(pageLoadTimeDiff);
			onSuccess(original, cloned);
		},
		[setIsTestComplete, onSuccess, onStart, clonedUrl]
	);

	const currentAttemptNumber = testAttemptRef.current[originalUrl] || 0;
	const isRerun = currentAttemptNumber >= 1;
	return (
		<div className="test test--component">
			<Form
				isTestInProgress={isTestInProgress}
				isRerun={isRerun}
				onSubmit={handleRunTest}
				defaultUrl={getInitialUrl()}
			/>
			{!isTestComplete ? (
				<TestProgressList testSequenceProgress={testSequenceProgress} />
			) : (
				<>
					<TestComplete attemptNumber={currentAttemptNumber} />
					<PerformanceBanner diff={pageLoadTimeDiff} />
				</>
			)}
		</div>
	);
};

export default TestForm;
