import React from 'react';
import unknownServerImg from '../../../assets/unknown-server.svg';
import './serverInfo.css';

const ServerInfo = ({ name, location, imgSrc = unknownServerImg }) => {
	const isUnknown = !name && !location;
	const className = ['server', isUnknown ? 'server--unknown' : ''].join(' ');
	return (
		<div className={className}>
			<div className="server-logo">
				<img src={imgSrc} alt="logo" />
			</div>
			<div className="server-info">
				<div className="server-info__name">{name || 'Unknown Host'}</div>
				<div className="server-info__location">
					<div className="location__label">Server location:</div>
					<div className="location__name">{location || 'Unknown Location'}</div>
				</div>
			</div>
		</div>
	);
};

export default ServerInfo;
