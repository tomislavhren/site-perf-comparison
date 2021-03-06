import React from 'react';

const GTMetrixLink = ({ reportUrl, label }) => {
	return (
		<div className="card__url">
			<a href={reportUrl} target="_blank" rel="noopener noreferrer">
				{label} <i className="fal fa-external-link margin margin--l-xs"></i>
			</a>
		</div>
	);
};

export default GTMetrixLink;
