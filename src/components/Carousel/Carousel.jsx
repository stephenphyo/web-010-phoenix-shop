/*** CSS Imports ***/
import { useState } from 'react';

/*** CSS Imports ***/
import './Carousel.css';

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function Carousel({ data }) {

    /* useState */
    const [slide, setSlide] = useState(0);

    /* Functions */
    const nextSlide = () => {
        setSlide(
            slide === data.length - 1
                ? 0
                : slide + 1
        )
    }

    const prevSlide = () => {
        setSlide(
            slide === 0
                ? data.length - 1
                : slide - 1
        )
    }

    return (
        <div className='sp-carousel'>
            {
                data.length > 1 &&
                <FaArrowAltCircleLeft
                    className='arrow left'
                    onClick={prevSlide} />
            }
            {
                data.map((item, idx) => (
                    <img src={item.src} alt={item.alt} key={idx}
                        className={`slide ${slide === idx ? '' : 'hidden'}`} />
                ))
            }
            {
                data.length > 1 &&
                <FaArrowAltCircleRight
                    className='arrow right'
                    onClick={nextSlide} />
            }
        </div>
    );
}

export default Carousel;