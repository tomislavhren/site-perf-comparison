import React from 'react';

const GTMetrixLink = ({ reportUrl }) => {
	return (
		<div className="card__url">
			<a href={reportUrl} target="_blank" rel="noopener noreferrer">
				Check rocket score on GTMetrix{' '}
				<i class="fal fa-external-link margin margin--l-xs"></i>
			</a>
		</div>
	);
};

export default GTMetrixLink;
