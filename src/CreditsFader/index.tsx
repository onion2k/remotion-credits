import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'

import './credits-fader.css';

export const CreditsFader: React.FC<{ credits: { role: string, name: string } }> = ({ credits }) => {
	const frame = useCurrentFrame();
	const video = useVideoConfig();

	const opacity = interpolate(
		frame,
		[0, video.durationInFrames * 0.1, video.durationInFrames * 0.9, video.durationInFrames],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	return (
		<div className={"credits-fader"}>
			{credits.role && <p className="uppercase" style={{ opacity }}>{credits.role}</p>}
			{credits.name && <p style={{ opacity }}>{credits.name}</p>}
		</div>);
};
