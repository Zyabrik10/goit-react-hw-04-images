import PropsType from 'props-type';

export const ImageGalleryItem = ({
  tags,
  src,
  largeImageURL,
  setIsModalOpen,
  setLargeImageSrcForModal,
}) => {
  const closeModalWindow = () => {
    setLargeImageSrcForModal('');
    setIsModalOpen(false);
    window.removeEventListener('keydown', closeModalWindow);
    document
      .querySelector('.modal-overlay')
      .removeEventListener('mousedown', closeModalWindow);
  };

  const closeModalWindowOnKey = ({ key }) => {
    if (key === 'Escape') {
      closeModalWindow();
    }
  };

  const closeModalWindowOnMouseDown = ({ target }) => {
    if (target.classList.contains('modal-overlay')) closeModalWindow();
  };

  const openModalOnClick = ({ target }) => {
    setIsModalOpen(true);
    setLargeImageSrcForModal(target.getAttribute('data-large'));

    window.addEventListener('keydown', closeModalWindowOnKey);
    document
      .querySelector('.modal-overlay')
      .addEventListener('mousedown', closeModalWindowOnMouseDown);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={src}
        alt={tags}
        loading="lazy"
        data-large={largeImageURL}
        onClick={openModalOnClick}
      />
    </li>
  );
};

ImageGalleryItem.propsType = {
  tags: PropsType.string,
  src: PropsType.string,
  largeImageURL: PropsType.string,
};
