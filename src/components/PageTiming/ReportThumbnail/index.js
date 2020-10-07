import React from 'react';
import placeholderImg from '../../../assets/placeholder.svg';

const ReportThumbnail = ({ reportUrl }) => {
	const src = reportUrl ? `${reportUrl}/screenshot.jpg` : placeholderImg;

	return (
		<div className="card__gtmetrix-image">
			<img alt="GMetrix Report thumbnail" src={src} />
		</div>
	);
};

export default ReportThumbnail;
