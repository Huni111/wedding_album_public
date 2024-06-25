import React, { useState, useEffect } from 'react'
import data from './dataex.js'
import Modal from './Modal.jsx';
import { fetchImagesFromAppwrite } from './config/fetchImage.js';
import client from './config/appwrite_config';
import { Storage, ID } from 'appwrite';

const storage = new Storage(client);


export default function List() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState(undefined);
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);



  useEffect(() => {
    const fetch = async () => {
      const img = await fetchImagesFromAppwrite();
      setImages(img.ids)
      console.log(images)
    }

    fetch();
  }, [])




  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedImages = await fetchImagesFromAppwrite();
  //     setImages(fetchedImages.images);
  //     setCursor(fetchedImages.nextCursor);
  //   };

  //   fetchData();
  // }, []);

  const fetchMoreImages = async () => {
    setIsLoading(true);
    const nextImages = await fetchImagesFromAppwrite(cursor);
    setImages([...images, ...nextImages.images]);
    setCursor(nextImages.nextCursor);
    setIsLoading(false);
  };
  
    const handleClick = (item, index) => {
     
      setCurrentIndex(index);
      setClickedImg(item);
    };
  
    const handelRotationRight = () => {
      const totalLength = images.length;
      if (currentIndex + 1 >= totalLength) {
        setCurrentIndex(0);
        const newUrl = storage.getFilePreview('66757aad001209759337', images[0].$id) ;
        setClickedImg(newUrl);
        return;
      }
      const newIndex = currentIndex + 1;
      const newUrl = images.filter((item) => {
        return images.indexOf(item) === newIndex;
      });
      const newItem = storage.getFilePreview('66757aad001209759337', newUrl[0].$id);
      setClickedImg(newItem);
      setCurrentIndex(newIndex);
    };
  
    const handelRotationLeft = () => {
      console.log('katt')
      const totalLength = images.length;
      if (currentIndex === 0) {
        setCurrentIndex(totalLength - 1);
        const newUrl = storage.getFilePreview('66757aad001209759337', images[totalLength - 1].$id) ;
        setClickedImg(newUrl);
        return;
      }
      const newIndex = currentIndex - 1;
      const newUrl = images.filter((item) => {
        return images.indexOf(item) === newIndex;
      });
      const newItem = storage.getFilePreview('66757aad001209759337', newUrl[0].$id);
      setClickedImg(newItem);
      setCurrentIndex(newIndex);
    };
  
    return (
      <div className="wrapper">

        {images.length > 0 ? (
  images.map((image, index) => (
    image.$id ? (
      <img 
        key={index} 
        src={storage.getFilePreview('66757aad001209759337', image.$id)} 
        alt={""} 
        onClick={() => handleClick(storage.getFilePreview('66757aad001209759337', image.$id), index)} 
      />
    ) : (
      <p key={index}>Invalid image ID</p>
    )
  ))  
) : (
  <p>Képek betőltése...</p>
)}



        
        {images.length === 0 && <p>Loading images...</p>} {/* Display loading message */}
        {cursor === undefined && <p>You've reached the end.</p>}
        <button onClick={fetchMoreImages} disabled={isLoading}>Load More</button>
        {clickedImg && (
          <Modal
            clickedImg={clickedImg}
            handelRotationRight={handelRotationRight}
            setClickedImg={setClickedImg}
            handelRotationLeft={handelRotationLeft}
          />
        )}
      </div>
    );
  
}