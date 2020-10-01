import React from 'react';

const IconButtonWithTooltip = ({
	children,
	tooltipTitle,
	tooltipText,
	tooltipId,
}) => {
	return (
		<>
			<button
				type="button"
				className="button button--link margin margin--l-xxs"
				data-tooltip={tooltipId}
			>
				{children}
			</button>
			<div className="tooltip tooltip--ttfb-rocket" style={{ margin: '0px' }}>
				<i className="tooltip__arrow" data-popper-arrow=""></i>
				<div className="tooltip__content">
					<div className="paragraph paragraph--xs font font--montserrat font--regular align align--left">
						<p>
							<strong className="color color--woodsmoke">{tooltipTitle}</strong>
							<br />
							{tooltipText}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default IconButtonWithTooltip;
