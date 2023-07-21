import { useState, useEffect } from 'react';
import fetchImages from 'api/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageSrcForModal, setLargeImageSrcForModal] = useState('');
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [prevPage, setPrevPage] = useState(page);

  const inputSearchText = searchText => {
    setSearchText(searchText);
  };

  const addImages = images => {
    setImages(prev => [...prev, ...images]);
  };

  const setDefaultPage = () => {
    setPage(1);
  };

  const increasePage = () => {
    setPage(prev => prev + 1);
  };

  const initMoreButton = callback => {
    if (callback()) setShowMoreButton(true);
    else setShowMoreButton(false);
  };

  async function initImagesList(query) {
    const { hits: images, totalHits } = await fetchImages(query);
    setImages(images);
    return totalHits;
  }

  useEffect(() => {
    if (searchText === '' || (prevPage !== 1 && page === prevPage)) return;

    async function addToImagesList(query) {
      const { hits: images, totalHits } = await fetchImages(query);
      addImages(images);
      return totalHits;
    }

    async function updateImageList() {
      const query = new URLSearchParams({
        q: searchText,
        page: page,
      }).toString();

      setLoader(true);

      if (page === 1) {
        const totalHits = await initImagesList(query);
        initMoreButton(() => totalHits > 12);
      } else {
        const totalHits = await addToImagesList(query);
        initMoreButton(() => images.length + 12 < totalHits);
      }

      setPrevPage(page);
      setLoader(false);
    }

    updateImageList();
  }, [page, searchText, images.length, prevPage]);

  return (
    <div className="App">
      <Searchbar
        inputSearchText={inputSearchText}
        setDefaultPage={setDefaultPage}
      />
      <ImageGallery
        images={images}
        setIsModalOpen={setIsModalOpen}
        setLargeImageSrcForModal={setLargeImageSrcForModal}
      />
      {loader ? <Loader /> : null}
      <Modal
        isModalOpen={isModalOpen}
        largeImageSrcForModal={largeImageSrcForModal}
        setIsModalOpen={setIsModalOpen}
        setLargeImageSrcForModal={setLargeImageSrcForModal}
      />
      {showMoreButton ? <Button increasePage={increasePage} /> : null}
    </div>
  );
};
