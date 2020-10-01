import React from 'react';
import unknownServerImg from '../../../assets/unknown-server.svg';

const ServerInfo = ({
	name = 'Unknown',
	location = 'Unknown',
	imgSrc = unknownServerImg,
}) => {
	return (
		<div className="card__test">
			<i className="card__test-icon">
				<img src={imgSrc} alt="Rocket" loading="lazy" />
			</i>
			<ul className="card__test-server">
				<li>{name}</li>
				<li>Server location:</li>
				<li>{location}</li>
			</ul>
		</div>
	);
};

export default ServerInfo;
