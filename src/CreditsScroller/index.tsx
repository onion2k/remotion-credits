import { useEffect, useRef, useState } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { useZoom, ZOOM_SIZE } from '../useZoom';

import './credits-scroller.css';

const CreditLine: React.FC<{ role: string, name: string | string[] }> = ({ role, name }) => {
	return (
		<>
			<span className={"credit-role"}>{role}:</span>
			<span className={"credit-name"}>
				{(typeof name === 'object') ? name.map((name, index) => (<span key={`credits-line-${role}-${name}`}>{name}</span>)) : name}
			</span>
		</>)
}

export const CreditsScroller: React.FC<{ className?: string, credits: Array<{ role: string, name: string | string[], padding?: number, className?: string }> }> = ({ className = '', credits }) => {
	const frame = useCurrentFrame();
	const video = useVideoConfig();

	const [{ zoom }, zoomRef] = useZoom();

	const creditsEl = useRef<HTMLUListElement>(null);
	const [creditsElHeight, setCreditsElHeight] = useState<number>(0);

	const offset = interpolate(
		frame,
		[0, video.durationInFrames],
		[video.height, -1 * creditsElHeight],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	useEffect(() => {
		if (creditsEl.current) {
			setCreditsElHeight(creditsEl.current.getBoundingClientRect().height / zoom);
		}
	}, [creditsEl, zoom]);

	return (<>
		<ul
			ref={creditsEl}
			className={`credits-scroller ${className}`}
			style={{ transform: `translateY(${offset}px)` }}>
			{credits.map(
				(line, index) => (<li
					key={`c-${index}`}
					className={"credits-line"}
					style={{ paddingBottom: line.padding }}>
					<CreditLine role={line.role} name={line.name} />
				</li>)
			)
			}
		</ul>
		<div
			ref={zoomRef}
			style={{
				position: 'absolute',
				display: 'block',
				top: -ZOOM_SIZE + 'px',
				backgroundColor: 'transparent',
				height: ZOOM_SIZE + 'px',
				width: ZOOM_SIZE + 'px'
			}}>.</div>

	</>);
};
