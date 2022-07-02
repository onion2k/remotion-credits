import { AbsoluteFill, Series } from 'remotion'
import { CreditsScroller } from './CreditsScroller';
import { CreditsImageFader } from './CreditsImageFader';
import { CreditsFader } from './CreditsFader';

import './credits.css';

export interface iCreditLine {
    role: string,
    name: string,
    padding: number
}

export interface iScreen {
    duration: number,
    credits?: Array<iCreditLine>,
    image?: string,
    className?: string,
    caption?: string
}

export const Credits: React.FC<{
    credits: Array<iScreen>
}> = ({ credits }) => {
    return (<AbsoluteFill>
        <Series>
            {credits.map((screen, index) => {
                if (!screen?.credits && !screen?.image) {
                    return <Series.Sequence key={`screen-${index}`} durationInFrames={screen.duration}><></></Series.Sequence>
                }
                if (screen.credits && screen.credits.length === 1) {
                    return (
                        <Series.Sequence key={`screen-${index}`} durationInFrames={screen.duration}>
                            <CreditsFader
                                credits={{ name: screen.credits[0].name as string, role: screen.credits[0].role as string }}
                            />
                        </Series.Sequence>
                    )
                }
                if (screen.credits) {
                    return (
                        <Series.Sequence key={`screen-${index}`} durationInFrames={screen.duration} layout="none">
                            <CreditsScroller credits={screen.credits} className={screen.className} />
                        </Series.Sequence>
                    )
                }
                if (screen.image) {
                    return (<Series.Sequence key={`screen-${index}`} durationInFrames={screen.duration}>
                        <CreditsImageFader
                            imagePath={screen.image}
                            className={screen.className ?? ''}
                            caption={screen.caption ?? ''}
                        />
                    </Series.Sequence>)
                }
                return null;
            })}
        </Series>
    </AbsoluteFill >);
};

export default Credits;
