import React from 'react';

const ServerInfo = ({ 
    name, 
    location,
    logoSrc = 'https://placehold.it/80x80',
 }) => {
    return (
        <div className="server">
            <div className="server-logo">
                <img src={logoSrc} alt="logo" />
            </div>
            <div className="server-info">
                <div className="server-info__name">{name}</div>
                <div className="server-info__location">
                    <div className="location__label">Server location:</div>
                    <div className="location__name">
                        {location}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ServerInfo;