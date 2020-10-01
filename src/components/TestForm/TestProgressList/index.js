import React from 'react';
import {
	testSequenceLabels,
	TestProgressStatus,
} from '../../../core/constants';

const testSequenceEntries = Object.entries(testSequenceLabels);

const getTestProgressIcon = status => {
	switch (status) {
		case TestProgressStatus.IN_PROGRESS:
			return <i class="fal fa-spinner fa-spin fa-fw margin margin--r-s" />;
		case TestProgressStatus.DONE:
			return <i class="fal fa-check fa-fw margin margin--r-s" />;
		case TestProgressStatus.PENDING:
		default:
			return <i class="fal fa-minus fa-fw margin margin--r-s" />;
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
				status === TestProgressStatus.DONE ? 'color color--limeade' : '',
				status === TestProgressStatus.IN_PROGRESS ? 'color color--orient' : '',
			]
				.join(' ')
				.trim();

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
		<div className="test__scroll">
			<ul ref={ulRef} style={{ transform: 'translateY(0)' }}>
				{testSequenceEntries.map(renderItem)}
			</ul>
		</div>
	);
};

export default TestProgressList;
