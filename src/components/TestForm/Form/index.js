import React from 'react';
import * as qs from 'query-string';
import './form.css';
import { validateURL } from '../../../core/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

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

const Form = ({ isTestInProgress, isRerun, onSubmit }) => {
	const inputRef = React.useRef(getInitialUrl());

	const handleSubmit = React.useCallback(
		e => {
			e.preventDefault();
			const url = inputRef.current.value;
			validateURL(url);
			onSubmit(url);
		},
		[onSubmit]
	);

	return (
		<form onSubmit={handleSubmit}>
			<div className="test-form__form-container">
				<div className="test-form__form-fields">
					<input
						className="test-form__input"
						required
						placeholder="Enter URL to test"
						type="url"
						name="url"
						ref={inputRef}
					/>
					<button
						disabled={isTestInProgress}
						type="submit"
						className="test-form__button test-form__button--blue"
					>
						<FontAwesomeIcon icon={faStopwatch} />
						{isRerun ? 'Rerun test' : 'Run test'}
					</button>
				</div>
			</div>
		</form>
	);
};

export default Form;
