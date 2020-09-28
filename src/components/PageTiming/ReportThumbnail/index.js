import React from 'react';
import './reportThumbnail.css';
import placeholder from '../../../assets/placeholder.svg';

const ReportThumbnail = ({ reportUrl }) => {
	const src = reportUrl ? `${reportUrl}/screenshot.jpg` : placeholder;
	return (
		<div className="report-thumbnail">
			<img
				className="report-thumbnail__img"
				alt="GMetrix Report thumbnail"
				src={src}
			/>
		</div>
	);
};

export default ReportThumbnail;
