import {useEffect, useState} from 'react';

interface Zoom {
  zoom: number
}

export const ZOOM_SIZE = 20;

export function useZoom<T extends HTMLElement = HTMLDivElement>(): [
  Zoom,
  (node: T | null) => void,
] {
  const [zoomElRef, setZoomElRef] = useState<T | null>(null)
  const [zoom, setZoom] = useState<Zoom>({
    zoom: 1
  })

	useEffect(()=>{
		const _zoom =
			(zoomElRef?.getBoundingClientRect().height as number) /
			ZOOM_SIZE;
		setZoom({ zoom: _zoom });
	}, [zoomElRef]);

  return [zoom, setZoomElRef]
}