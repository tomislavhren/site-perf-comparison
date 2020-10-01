import React from 'react';

const ReportThumbnail = ({ reportUrl }) => {
	const src = reportUrl
		? `${reportUrl}/screenshot.jpg`
		: '//fori.ch/placeholder.svg';

	return (
		<div className="card__gtmetrix-image">
			<img alt="GMetrix Report thumbnail" src={src} />
		</div>
	);
};

export default ReportThumbnail;
