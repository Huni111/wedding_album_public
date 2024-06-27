import React, { useState, useEffect } from 'react'
import Modal from './Modal.jsx';
import { fetchImagesFromAppwrite } from './config/fetchImage.js';
import { fetchMoreImagesFromAppwrite } from './config/fetchMoreImage.js';
import client from './config/appwrite_config';
import { Storage, ID } from 'appwrite';

const storage = new Storage(client);


export default function List() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);



  useEffect(() => {
    const fetch = async () => {
      const img = await fetchImagesFromAppwrite();
      setImages(img.ids)
      
       
      //     setCursor(img.nextCursor);
    }

    fetch();
  }, [])

  // fetchMore function here!

  const fetchMoreImages = async () => {
    setIsLoading(true);

    try {
      
      const cursor = images[images.length - 1].$id;
      // console.log(cursor)
      // const ofset = images.length;
      
      const nextImages  = await fetchMoreImagesFromAppwrite(cursor);
      console.log(nextImages)
      setImages([...images, ...nextImages.ids]);
      

    } catch (err) {
      console.error('Error fetching more images:', err);

    }finally{
      setIsLoading(false)
    }




    


  }

  // fetchMore function here!

  const handleClick = (item, index) => {

    setCurrentIndex(index);
    setClickedImg(item);
  };

  const handelRotationRight = () => {
    const totalLength = images.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = storage.getFilePreview('66757aad001209759337', images[0].$id);
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
    const totalLength = images.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = storage.getFilePreview('66757aad001209759337', images[totalLength - 1].$id);
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
    <>
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



        {clickedImg && (
          <Modal
            clickedImg={clickedImg}
            handelRotationRight={handelRotationRight}
            setClickedImg={setClickedImg}
            handelRotationLeft={handelRotationLeft}
          />
        )}
      </div>

      <div className='footer'>

        {isLoading && <h3>Betőltés...</h3>}

        <button className='file' onClick={fetchMoreImages} disabled={isLoading}>Még több kép!</button>
      </div>
    </>
  );

}