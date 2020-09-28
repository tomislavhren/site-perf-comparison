import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './gtmetrixLink.css';

const GTMetrixLink = ({ reportUrl }) => {
	return (
		<a href={reportUrl} className="gtmetrix-link" rel="noopener noreferrer">
			Check rocket score on GTMetrix{' '}
			<FontAwesomeIcon icon={faExternalLinkAlt} />
		</a>
	);
};

export default GTMetrixLink;
