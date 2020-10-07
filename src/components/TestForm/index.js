import React from 'react';
import * as service from '../../core/service';
import * as utils from '../../core/utils';
import { TestSequence, TestProgressStatus, initialTestProgress, rerunTestProgress } from '../../core/constants';
import TestProgressList from './TestProgressList';
import TestComplete from './TestComplete';
import TestError from './TestError';
import * as qs from 'query-string';
import Form from './Form';
import PerformanceBanner from './PerformanceBanner';

const getInitialUrl = () => {
	const { url: initialUrl = '' } = qs.parse(window.location.search);
	const trimmedUrl = initialUrl.trim();
	if (!trimmedUrl) {
		return '';
	}

	return /^https?:\/\/.+/.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
};

const TestForm = ({ onStart, onSuccess }) => {
	const [originalUrl, setOriginalUrl] = React.useState();
	const [clonedUrl, setClonedUrl] = React.useState();

	const [error, setError] = React.useState();
	const [pageLoadTimeDiff, setPageLoadTimeDiff] = React.useState();
	const [isTestInProgress, setIsTestInProgress] = React.useState(false);
	const [isTestComplete, setIsTestComplete] = React.useState(false);
	const testAttemptRef = React.useRef({});

	const [testSequenceProgress, setTestSequenceProgress] = React.useState({
		...initialTestProgress,
	});

	const markAsInProgress = React.useCallback(
		(key, filesDone, filesCount) => {
			setTestSequenceProgress(prevState => ({
				...prevState,
				...(Array.isArray(key)
					? key.reduce(
							(acc, k) => ({
								...acc,
								[k]: {
									...prevState[k],
									status: TestProgressStatus.IN_PROGRESS,
								},
							}),
							{}
					  )
					: { [key]: { status: TestProgressStatus.IN_PROGRESS, filesDone, filesCount } }),
			}));
		},
		[setTestSequenceProgress]
	);

	const markAsDone = React.useCallback(
		key => {
			setTestSequenceProgress(prevState => ({
				...prevState,
				...(Array.isArray(key)
					? key.reduce(
							(acc, k) => ({
								...acc,
								[k]: {
									...prevState[k],
									status: TestProgressStatus.DONE,
									filesDone: prevState[k].filesCount,
								},
							}),
							{}
					  )
					: { [key]: { status: TestProgressStatus.DONE, filesDone: prevState[key].filesCount } }),
			}));
		},
		[setTestSequenceProgress]
	);

	const waitAndUpdateProgress = React.useCallback(
		async (key, time) => {
			markAsInProgress(key);
			await utils.wait(time);
			markAsDone(key);
		},
		[markAsInProgress, markAsDone]
	);

	const waitAndMarkAsDone = React.useCallback(
		async (key, time) => {
			await utils.wait(time);
			markAsDone(key);
		},
		[markAsDone]
	);

	const cloneWebsite = React.useCallback(
		async url => {
			return new Promise(async (resolve, reject) => {
				try {
					// start "Download HTML" spinner
					markAsInProgress(TestSequence.DOWNLOAD_HTML);

					// start cloner and wait for job id
					const jobId = await service.startCloner(url);

					// ping the cloner for the status update
					const newUrl = await service.getClonerStatus(jobId, (status, data) => {
						switch (status) {
							case 'DOWNLOAD_HTML':
								markAsInProgress(TestSequence.DOWNLOAD_HTML, data.filesDone, data.filesCount);
								break;
							case 'DOWNLOAD_FILES':
								markAsDone(TestSequence.DOWNLOAD_HTML);
								markAsInProgress(TestSequence.DOWNLOAD_ASSETS, data.filesDone, data.filesCount);
								break;
							default:
								throw new Error(`We've ran into a problem while cloning the site. Please try again.`);
						}
					});

					// if the cloner was really quick and we didn't get the time
					// to receive any other status then SUCCESS
					await waitAndMarkAsDone(TestSequence.DOWNLOAD_HTML, 0.5);
					await waitAndMarkAsDone(TestSequence.DOWNLOAD_ASSETS, 0.5);

					// return the cloned url
					resolve(newUrl);
				} catch (error) {
					reject(error);
				}
			});
		},
		[markAsDone, waitAndMarkAsDone, markAsInProgress]
	);

	const handleRunTest = React.useCallback(
		async url => {
			try {
				onStart();

				// Helper methods
				const incrementTestAttempt = url => {
					testAttemptRef.current[url] = testAttemptRef.current[url] ? testAttemptRef.current[url] + 1 : 1;
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
					await waitAndUpdateProgress(TestSequence.VERIFY_URL, 1);
					clonedWebsiteUrl = await cloneWebsite(url);
					setClonedUrl(clonedWebsiteUrl);
					await waitAndUpdateProgress(TestSequence.OPTIMIZE_ASSETS, 2);
					await waitAndUpdateProgress(TestSequence.INIT_CLONED_SITE, 1);
				}

				markAsInProgress(TestSequence.PERFORMING_TEST);
				const [originalWebsitePerformanceResults, clonedWebsitePerformanceResults] = await Promise.all([
					service.fetchPerformanceResults(url),
					service.fetchPerformanceResults(clonedWebsiteUrl),
				]);
				markAsDone(TestSequence.PERFORMING_TEST);

				const { cloned, original } = utils.extractPerformanceProps(
					originalWebsitePerformanceResults,
					clonedWebsitePerformanceResults
				);

				const pageLoadTimeDiff = utils.calculateDiffPercentage(cloned.pageLoadTime.data, original.pageLoadTime.data);
				setPageLoadTimeDiff(pageLoadTimeDiff);

				// this will propagate performance results and show cards
				onSuccess(original, cloned);
			} catch (error) {
				setError(error.message);
			} finally {
				// Shows "Your site is X% faster" banner
				setIsTestComplete(true);
				// Enables run button
				setIsTestInProgress(false);
			}
		},
		[
			markAsInProgress,
			markAsDone,
			waitAndUpdateProgress,
			setIsTestComplete,
			onSuccess,
			onStart,
			clonedUrl,
			cloneWebsite,
		]
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
			{error ? (
				<TestError message={error} />
			) : !isTestComplete ? (
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
