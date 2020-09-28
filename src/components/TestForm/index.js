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
import TestComplete from '../TestComplete';
import * as qs from 'query-string';
import Form from './Form';
import './testForm.css';

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
	const [originalUrl, setOriginalUrl] = React.useState(getInitialUrl());
	const [clonedUrl, setClonedUrl] = React.useState('');

	const [isTestInProgress, setIsTestInProgress] = React.useState(false);
	const [isTestComplete, setIsTestComplete] = React.useState(false);
	const [testAttempt, setTestAttempt] = React.useState({});

	const [testSequenceProgress, setTestSequenceProgress] = React.useState({
		...initialTestProgress,
	});

	const incrementTestAttempt = React.useCallback(
		url => {
			setTestAttempt(prev => ({
				...prev,
				[url]: prev[url] ? prev[url] + 1 : 1,
			}));
		},
		[setTestAttempt]
	);

	const handleRunTest = React.useCallback(
		async url => {
			onStart();

			setOriginalUrl(url);

			// Disables the button
			setIsTestInProgress(true);

			// Reset everything
			setIsTestComplete(false);
			setTestSequenceProgress({ ...initialTestProgress });

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

			// Attempt is shown below the input after the test is run for the 1st time
			incrementTestAttempt(url);

			updateTestSequenceProgress(
				testSequence.VERIFY_URL,
				TestProgressStatus.IN_PROGRESS
			);
			const clonedWebsiteUrl = await service.cloneWebsite(url);
			setClonedUrl(clonedWebsiteUrl);

			updateTestSequenceProgress(
				testSequence.VERIFY_URL,
				TestProgressStatus.DONE
			);

			// UX only, no logic
			await waitAndUpdateTestSequenceProgress(testSequence.DOWNLOAD_HTML, 5);
			await waitAndUpdateTestSequenceProgress(testSequence.DOWNLOAD_ASSETS, 7);
			await waitAndUpdateTestSequenceProgress(testSequence.OPTIMIZE_ASSETS, 5);
			await waitAndUpdateTestSequenceProgress(testSequence.INIT_CLONED_SITE, 1);

			updateTestSequenceProgress(
				testSequence.PERFORMING_TEST,
				TestProgressStatus.IN_PROGRESS
			);
			const [
				realWebsitePerformanceResults,
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

			onSuccess(realWebsitePerformanceResults, clonedWebsitePerformanceResults);
		},
		[incrementTestAttempt, setIsTestComplete, onSuccess, onStart]
	);

	const handleRerunTest = React.useCallback(
		async url => {
			onStart();

			setIsTestComplete(false);
			setTestSequenceProgress({ ...rerunTestProgress });

			const originalOrigin = utils.validateURL(originalUrl);
			const clonedOrigin = utils.validateURL(clonedUrl);

			// Disables run button
			setIsTestInProgress(true);

			incrementTestAttempt(url);

			const [
				realWebsitePerformanceResults,
				clonedWebsitePerformanceResults,
			] = await Promise.all([
				service.fetchPerformanceResults(originalOrigin),
				service.fetchPerformanceResults(clonedOrigin),
			]);

			// Shows "Your site is X% faster" banner
			setIsTestComplete(true);
			// Enables run button
			setIsTestInProgress(false);

			onSuccess(realWebsitePerformanceResults, clonedWebsitePerformanceResults);
		},
		[originalUrl, clonedUrl, incrementTestAttempt, onSuccess, onStart]
	);

	const attemptNumber = testAttempt[originalUrl] || 0;
	const isRerun = attemptNumber > 0;
	const onSubmit = isRerun ? handleRerunTest : handleRunTest;
	return (
		<div className="test-form">
			<div className="test-form__form-wrapper">
				<Form
					isTestInProgress={isTestInProgress}
					isRerun={isRerun}
					onSubmit={onSubmit}
				/>
			</div>
			{!isTestComplete ? (
				<TestProgressList testSequenceProgress={testSequenceProgress} />
			) : (
				<TestComplete attemptNumber={attemptNumber} />
			)}
		</div>
	);
};

export default TestForm;
