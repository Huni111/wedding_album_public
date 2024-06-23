import React, { useState } from 'react'
import data from './dataex.js'
import Modal from './Modal.jsx';
import { fetchImagesFromAppwrite } from './config/fetchImage.js';


export default function List() {
    const [clickedImg, setClickedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
  
    const handleClick = (item, index) => {
      setCurrentIndex(index);
      setClickedImg(item.src);
    };
  
    const handelRotationRight = () => {
      const totalLength = data.length;
      if (currentIndex + 1 >= totalLength) {
        setCurrentIndex(0);
        const newUrl = data[0].src;
        setClickedImg(newUrl);
        return;
      }
      const newIndex = currentIndex + 1;
      const newUrl = data.filter((item) => {
        return data.indexOf(item) === newIndex;
      });
      const newItem = newUrl[0].src;
      setClickedImg(newItem);
      setCurrentIndex(newIndex);
    };
  
    const handelRotationLeft = () => {
      const totalLength = data.length;
      if (currentIndex === 0) {
        setCurrentIndex(totalLength - 1);
        const newUrl = data[totalLength - 1].src;
        setClickedImg(newUrl);
        return;
      }
      const newIndex = currentIndex - 1;
      const newUrl = data.filter((item) => {
        return data.indexOf(item) === newIndex;
      });
      const newItem = newUrl[0].src;
      setClickedImg(newItem);
      setCurrentIndex(newIndex);
    };
  
    return (
      <div className="wrapper">
        {data.map((item, index) => (
          <div key={index} className="wrapper-images">
            <img
              src={item.src}
              
              onClick={() => handleClick(item, index)}
            />
            <h2>{item.text}</h2>
          </div>
        ))}
        <div>
          {clickedImg && (
            <Modal
              clickedImg={clickedImg}
              handelRotationRight={handelRotationRight}
              setClickedImg={setClickedImg}
              handelRotationLeft={handelRotationLeft}
            />
          )}
        </div>
      </div>
    );
  
}