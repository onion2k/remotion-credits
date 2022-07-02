import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

import './credits-image-fader.css';

export const CreditsImageFader: React.FC<{ imagePath: string, className: string, caption?: string }> = ({ imagePath, className, caption }) => {
	const frame = useCurrentFrame();
	const video = useVideoConfig();

	const opacity = interpolate(
		frame,
		[0, video.durationInFrames * 0.1, video.durationInFrames * 0.9, video.durationInFrames],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const imgSrc = imagePath;

	return (
		<div className={"credits-image-fader"}>
			<div className={"image-container"} style={{ opacity }}>
				<Img src={imgSrc} />
				{caption && <div>{caption}</div>}
			</div>
		</div>);
};
