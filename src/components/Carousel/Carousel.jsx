import React, { useState } from 'react';

/*** CSS Imports ***/
import './Carousel.css';

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function Carousel({ children }) {

    /* Constants */
    const childCount = React.Children.count(children);

    /* useState */
    const [slide, setSlide] = useState(0);

    /* Functions */
    const nextSlide = () => {
        setSlide(
            slide === childCount - 1
                ? 0
                : slide + 1
        )
    }

    const prevSlide = () => {
        setSlide(
            slide === 0
                ? childCount - 1
                : slide - 1
        )
    }

    return (
        <div className='sp-carousel'>
            {
                childCount > 1 &&
                <FaArrowAltCircleLeft
                    className='arrow left'
                    onClick={prevSlide} />
            }
            {
                React.Children.map(children, (child, idx) => (
                    React.cloneElement(child, {
                        isActive: slide === idx,
                    })
                ))
            }
            {
                childCount > 1 &&
                <FaArrowAltCircleRight
                    className='arrow right'
                    onClick={nextSlide} />
            }
        </div>
    );
}

const CarouselItem = ({ isActive, children }) => {
    return (
      <div className={`slide ${isActive ? '' : 'hidden'}`}>
        {children}
      </div>
    );
  };

Carousel.Carousel = Carousel;
Carousel.Item = CarouselItem;

export default Carousel;