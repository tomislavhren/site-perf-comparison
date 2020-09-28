import React from 'react';
import {
	testSequenceLabels,
	TestProgressStatus,
} from '../../../core/constants';
import './testProgressList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner, faMinus } from '@fortawesome/free-solid-svg-icons';

const testSequenceEntries = Object.entries(testSequenceLabels);

const getTestProgressIcon = status => {
	switch (status) {
		case TestProgressStatus.IN_PROGRESS:
			return <FontAwesomeIcon icon={faSpinner} spin />;
		case TestProgressStatus.DONE:
			return <FontAwesomeIcon icon={faCheck} />;
		case TestProgressStatus.PENDING:
		default:
			return <FontAwesomeIcon icon={faMinus} />;
	}
};

const TestProgressList = ({ testSequenceProgress }) => {
	const ulRef = React.useRef();

	React.useEffect(() => {
		const statusInProgress = Object.keys(testSequenceProgress).find(
			key => testSequenceProgress[key] === TestProgressStatus.IN_PROGRESS
		);
		const li = document.querySelector(
			`[data-animation-id='${statusInProgress}']`
		);

		if (li) {
			const liIndex = +li.getAttribute('data-animation-index');
			ulRef.current.style.transform = `translateY(-${
				liIndex * li.clientHeight
			}px)`;
		}
	}, [testSequenceProgress]);

	const renderItem = React.useCallback(
		([key, text], index) => {
			const status = testSequenceProgress[key];

			const className = [
				'test-progress-list__item',
				status === TestProgressStatus.DONE
					? 'test-progress-list__item--done'
					: '',
				status === TestProgressStatus.IN_PROGRESS
					? 'test-progress-list__item--in-progress'
					: '',
			].join(' ');

			return (
				<li
					className={className}
					key={key}
					data-animation-id={key}
					data-animation-index={index}
				>
					{getTestProgressIcon(status)}
					{text}
				</li>
			);
		},
		[testSequenceProgress]
	);

	return (
		<div className="test-progress-list">
			<ul ref={ulRef} className="test-progress-list__container">
				{testSequenceEntries.map(renderItem)}
			</ul>
		</div>
	);
};

export default TestProgressList;
