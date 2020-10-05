/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { createPopper } from '@popperjs/core';

const IconButtonWithTooltip = ({
	children,
	tooltipTitle,
	tooltipText,
	tooltipId,
}) => {
	const tooltipRef = React.useRef();
	const tooltipButtonRef = React.useRef();
	const tooltipElementRef = React.useRef();

	function tooltipCreate() {
		Popper &&
			(tooltipRef.current = createPopper(
				tooltipButtonRef.current,
				tooltipElementRef.current,
				{
					modifiers: [{ name: 'offset', options: { offset: [0, 16] } }],
				}
			));
	}

	function tooltipDestroy() {
		tooltipRef.current &&
			(tooltipRef.current.destroy(), (tooltipRef.current = null));
	}

	function tooltipShow() {
		tooltipElementRef.current.classList.add('is-active');
		tooltipCreate();
	}

	function tooltipHide() {
		tooltipElementRef.current.classList.remove('is-active');
		tooltipDestroy();
	}

	return (
		<>
			<button
				type="button"
				className="button button--link margin margin--l-xxs"
				data-tooltip={tooltipId}
				onMouseEnter={tooltipShow}
				onMouseLeave={tooltipHide}
				ref={tooltipButtonRef}
			>
				{children}
			</button>
			<div
				ref={tooltipElementRef}
				className={`tooltip   ${tooltipId}`}
				style={{ margin: '0px' }}
			>
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
