import React from 'react';
import Spinner from './components/Spinner';
import useMountedRef from './hooks/useMountedRef';
import type { BrokenElementParams } from './types';
import './Photo.less';

export interface IPhotoLoadedParams {
  loaded?: boolean;
  naturalWidth?: number;
  naturalHeight?: number;
  broken?: boolean;
}

export interface IPhotoProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  loaded: boolean;
  broken: boolean;
  onPhotoLoad: (params: IPhotoLoadedParams) => void;
  loadingElement?: JSX.Element;
  brokenElement?: JSX.Element | ((photoProps: BrokenElementParams) => JSX.Element);
  type?: 'video' | 'image';
  showVideoControls?: boolean;
}

export default function Photo({
  src,
  loaded,
  broken,
  className,
  onPhotoLoad,
  loadingElement,
  brokenElement,
  type,
  showVideoControls,
  ...restProps
}: IPhotoProps) {
  const mountedRef = useMountedRef();

  function handleImageLoaded(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.target as HTMLImageElement;
    if (mountedRef.current) {
      onPhotoLoad({
        loaded: true,
        naturalWidth,
        naturalHeight,
      });
    }
  }

  function handleImageBroken() {
    if (mountedRef.current) {
      onPhotoLoad({
        broken: true,
      });
    }
  }

  if (src && !broken) {
    return (
      <>
      {(type && type === 'video') ? 
        <video
          className={`PhotoView__Photo${className ? ` ${className}` : ''}`} 
          src={src}
          onLoad={handleImageLoaded}
          onError={handleImageBroken}
          controls={showVideoControls}
          alt=""
          {...restProps}
        />
      :
        <img
          className={`PhotoView__Photo${className ? ` ${className}` : ''}`}
          src={src}
          onLoad={handleImageLoaded}
          onError={handleImageBroken}
          alt=""
          {...restProps}
        />
      }
        {!loaded &&
          (<span className="PhotoView__icon">{loadingElement}</span> || <Spinner className="PhotoView__icon" />)}
      </>
    );
  }

  if (brokenElement) {
    return (
      <span className="PhotoView__icon">
        {typeof brokenElement === 'function' ? brokenElement({ src }) : brokenElement}
      </span>
    );
  }

  return null;
}
