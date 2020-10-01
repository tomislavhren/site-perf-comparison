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
				class="button button--link margin margin--l-xxs"
				data-tooltip={tooltipId}
			>
				{children}
			</button>
			<div class="tooltip tooltip--ttfb-rocket" style={{ margin: '0px' }}>
				<i class="tooltip__arrow" data-popper-arrow=""></i>
				<div class="tooltip__content">
					<div class="paragraph paragraph--xs font font--montserrat font--regular align align--left">
						<p>
							<strong class="color color--woodsmoke">{tooltipTitle}</strong>
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
