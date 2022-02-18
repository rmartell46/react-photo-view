import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { ImageList, ViewBox, photoImages } from './doc-components';

export default function DocDemo() {
  return (
    <PhotoProvider loop={4}>
      <ImageList>
        {photoImages.slice(0, 3).map((item, index) => (
          <PhotoView key={index} src={item}>
            <ViewBox viewImage={item} />
          </PhotoView>
        ))}
      </ImageList>
    </PhotoProvider>
  );
}
