declare module 'remotion-credits/CreditsFader/index' {
  /// <reference types="react" />
  import './credits-fader.css';
  export const CreditsFader: React.FC<{
      credits: {
          role: string;
          name: string;
      };
  }>;

}
declare module 'remotion-credits/CreditsImageFader/index' {
  /// <reference types="react" />
  import './credits-image-fader.css';
  export const CreditsImageFader: React.FC<{
      imagePath: string;
      className: string;
      caption?: string;
  }>;

}
declare module 'remotion-credits/CreditsScroller/index' {
  /// <reference types="react" />
  import './credits-scroller.css';
  export const CreditsScroller: React.FC<{
      className?: string;
      credits: Array<{
          role: string;
          name: string | string[];
          padding?: number;
          className?: string;
      }>;
  }>;

}
declare module 'remotion-credits/index' {
  /// <reference types="react" />
  import './credits.css';
  export interface iCreditLine {
      role: string;
      name: string;
      padding: number;
  }
  export interface iScreen {
      duration: number;
      credits?: Array<iCreditLine>;
      image?: string;
      className?: string;
      caption?: string;
  }
  export const Credits: React.FC<{
      credits: Array<iScreen>;
  }>;
  export default Credits;

}
declare module 'remotion-credits/useZoom' {
  interface Zoom {
      zoom: number;
  }
  export const ZOOM_SIZE = 20;
  export function useZoom<T extends HTMLElement = HTMLDivElement>(): [
      Zoom,
      (node: T | null) => void
  ];
  export {};

}
declare module 'remotion-credits' {
  import main = require('remotion-credits/src/index');
  export = main;
}