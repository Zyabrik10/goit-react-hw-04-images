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
  const [isMoreButtonShowed, setIsMoreButtonShowed] = useState(false);

  const [bool1, setBool1] = useState(false);
  const [bool2, setBool2] = useState(false);

  const inputSearchText = text => {
    setSearchText(text);
  };

  const setDefImages = images => {
    setImages(images);
  };

  const addImages = newIMages => {
    setImages(prev => [...prev, ...newIMages]);
  };

  const setDefaultPage = () => {
    setPage(1);
  };

  const increasePage = () => {
    setPage(prev => ++prev);
  };

  useEffect(() => {
    if (!bool1) {
      setBool1(true);
      return;
    }

    const query = new URLSearchParams({
      q: searchText,
      page,
    }).toString();
    setLoader(true);

    console.log(query);

    fetchImages(query).then(({ hits: images, totalHits }) => {
      if (totalHits > 12) setIsMoreButtonShowed(true);
      else setIsMoreButtonShowed(false);
      setDefImages(images);
      setLoader(false);
    });
  }, [searchText]);

  useEffect(() => {
    if (!bool2) {
      setBool2(true);
      return;
    }

    const query = new URLSearchParams({
      q: searchText,
      page,
    });
    setLoader(true);

    fetchImages(query).then(({ hits: images, totalHits }) => {
      if (images.length + 12 < totalHits) setIsMoreButtonShowed(true);
      else setIsMoreButtonShowed(false);
      addImages(images);
      setLoader(false);
    });
  }, [page]);

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
      />
      {isMoreButtonShowed ? <Button increasePage={increasePage} /> : null}
    </div>
  );
};
