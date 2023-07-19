import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import PropsType from 'props-type';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ images, setIsModalOpen, setLargeImageSrcForModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ webformatURL: src, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={nanoid()}
            src={src}
            tags={tags}
            largeImageURL={largeImageURL}
            setIsModalOpen={setIsModalOpen}
            setLargeImageSrcForModal={setLargeImageSrcForModal}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propsType = {
  images: PropsType.array,
  triggerModalWindow: PropsType.func,
  setLargeImageSrcForModal: PropsType.func,
};
