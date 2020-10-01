import React from 'react';
import * as qs from 'query-string';
import { validateURL } from '../../../core/utils';

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

const Form = ({ isTestInProgress, isRerun, onSubmit, defaultUrl }) => {
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
		<div className="test__form">
			<form onSubmit={handleSubmit}>
				<div className="field field--xl field--white">
					<div className="field__helper">
						<input
							className="field__input"
							required
							placeholder="Enter URL to test"
							type="url"
							ref={inputRef}
							defaultValue={defaultUrl}
						/>
						<button
							disabled={isTestInProgress}
							type="submit"
							className="button button--l button--curious-blue button--fill"
						>
							<i class="fal fa-stopwatch margin margin--r-s"></i>{' '}
							{isRerun ? 'Rerun test' : 'Run test'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Form;
