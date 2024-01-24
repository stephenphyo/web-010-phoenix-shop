import React, { useState } from 'react';

/*** CSS Imports ***/
import './Product.css';

/*** Icon Imports ***/
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty, IoMdCheckmarkCircle } from "react-icons/io";

/*** Package Imports ***/
import numeral from 'numeral';

import Carousel from 'components/Carousel/Carousel';

function Product({ data }) {

    /* useState */
    const [isLiked, setIsLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    /* Functions */
    const buyNow = (e) => {
        e.stopPropagation();
        console.log('Buy Now');
    }

    const addToCart = (e) => {
        e.stopPropagation();
        console.log('Add to Cart');
    }

    const rating = Math.floor(data?.ratings * 2) / 2;
    const ratingFull = Math.floor(rating);
    const ratingHalf = rating - ratingFull;
    const ratingEmpty = 5 - Math.ceil(rating);

    // const newPrice = 40
    // const originalPrice = 100
    const discount = Math.ceil((data?.originalPrice - data?.newPrice) / data?.originalPrice * 100)
    const numSold = 235
    // const numStock = 25

    return (
        <div className='product'
            onClick={() => console.log('View Product')}>
            <div className='product_image'>
                <Carousel>
                    {
                        data?.images.map((image, idx) => (
                            <Carousel.Item key={idx}>
                                <img src={image?.url}
                                    alt={image?.public_id} />
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            </div>
            <div className='product_info'>
                <div className='product_name'>
                    {data?.name}
                </div>
                <div className='d-flex'>
                    <div className='product_price'>
                        <span id='price'>
                            <span id='currency'>$</span>
                            <span>{data?.newPrice}</span>
                            <span id='original_price'>{`$${data?.originalPrice}`}</span>
                        </span>
                    </div>
                    <div className='product_stock'>
                        <span>
                            {data?.numStock <= 20 ? 'Only' : ''} {data?.numStock} items left
                        </span>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='product_ratings'>
                        <div className='product_ratings_star'>
                            {Array(ratingFull).fill().map((_, index) => <FaStar key={index} size={15} />)}
                            {ratingHalf !== 0 && <FaStarHalfAlt size={15} />}
                            {Array(ratingEmpty).fill().map((_, index) => <FaRegStar key={index} size={15} />)}
                        </div>
                        <span id='num_reviews'>
                            ({
                                data?.numReviews > 1000
                                    ? numeral(data?.numReviews).format('0.0a').toUpperCase()
                                    : data?.numReviews
                            })
                        </span>
                    </div>
                    <div className='product_sold'>
                        <span>
                            <span className='fw-bold'>
                                {
                                    numSold > 1000
                                        ? numeral(numSold).format('0.0a').toUpperCase()
                                        : numSold
                                }
                            </span> sold
                        </span>
                    </div>
                </div>
                <div>
                    <div className='product_seller'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/8/8a/Bouclier_Captain_America_1018.png'
                            alt='' />
                        <span className='product_seller_name'>
                            Stephen Shop
                            <span id='mark'><IoMdCheckmarkCircle size={13} /></span>
                        </span>
                    </div>
                </div>
                <div className='product_controls'>
                    <button id='buy_now'
                        onClick={(e) => buyNow(e)}>
                        Buy Now
                    </button>
                    <button id='add_to_cart'
                        onClick={(e) => addToCart(e)}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className='product_favourite'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsLiked(!isLiked)}>
                {
                    isLiked
                        ? isHovered
                            ? <IoMdHeartEmpty size={22} />
                            : <IoMdHeart size={22} />
                        : isHovered
                            ? <IoMdHeart size={22} />
                            : <IoMdHeartEmpty size={22} />
                }
            </div>
            {
                discount !== 0 &&
                <div className='product_discount'>
                    <span>{discount}% Off</span>
                </div>
            }
        </div>
    );
}

export default Product;