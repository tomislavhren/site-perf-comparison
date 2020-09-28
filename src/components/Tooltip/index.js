import React from 'react';
import './tooltip.css';

const Tooltip = ({ text, label, className = '', children }) => {
	return (
		<div className={`${className} tooltip`}>
			{children}
			<div className="tooltip__wrapper">
				<div className="tooltip__container">
					{label && <div className="tooltip__label">{label}</div>}
					<div className="tooltip__content">{text}</div>
				</div>
			</div>
		</div>
	);
};

export default Tooltip;
