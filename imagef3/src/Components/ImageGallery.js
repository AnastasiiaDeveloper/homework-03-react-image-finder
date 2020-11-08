import React from 'react';
// import ImageGallery from './ImageGallery'
 import ImageGalleryItem from './ImageGalleryItem'


const ImageGallery = props => (
    <ul className="ImageGallery">
      {props.images.map(image =>
        <ImageGalleryItem
          preview={image.webformatURL}
          largeImage={image.largeImageURL}
        />)}
    </ul>
  )



  export default ImageGallery