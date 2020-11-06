import React from 'react';
import { sanitizeAndValidateURL } from '../../../core/utils';

const Form = ({ isTestInProgress, isRerun, onSubmit, defaultUrl }) => {
	const inputRef = React.useRef();
	const formRef = React.useRef();

	const handleSubmit = React.useCallback(
		e => {
			e && e.preventDefault();
			const url = sanitizeAndValidateURL(inputRef.current.value);
			onSubmit(url);
		},
		[onSubmit]
	);

	React.useEffect(() => {
		if (defaultUrl) {
			handleSubmit();
		}
	}, []);

	return (
		<div className="test__form">
			<form ref={formRef} onSubmit={handleSubmit}>
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
							<i className="fal fa-stopwatch margin margin--r-s"></i> {isRerun ? 'Rerun test' : 'Run test'}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Form;
