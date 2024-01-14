import React, { useState } from 'react';

/*** CSS Imports ***/
import './Product.css';

/*** Icon Imports ***/
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

function Product() {

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

    const rating = 3.5
    const ratingFull = Math.floor(rating);
    const ratingHalf = rating - ratingFull;
    const ratingEmpty = 5 - Math.ceil(rating);

    const originalPrice = 250
    const newPrice = 25
    const discount = Math.ceil(newPrice / originalPrice * 100)

    return (
        <div className='product'
            onClick={() => console.log('View Product')}>
            <div className='product_image'>
                <img src="https://images.gamewatcherstatic.com/image/file/0/98/87240/avengers_wallpaper_1920x1080_by_sachso74-d8giflj_copy.jpg"
                    alt='' />
            </div>
            <div className='product_info'>
                <div className='product_name'>
                    Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1
                </div>
                <div className='d-flex'>
                    <div className='product_ratings'>
                        <div className='product_ratings_star'>
                            {Array(ratingFull).fill().map((_, index) => <FaStar size={15} />)}
                            {ratingHalf !== 0 && <FaStarHalfAlt size={15} />}
                            {Array(ratingEmpty).fill().map((_, index) => <FaRegStar size={15} />)}
                        </div>
                        <span id='num_reviews'>(0)</span>
                    </div>
                    <div className='product_sold'>
                        <span><span className='fw-bold'>183</span> sold</span>
                    </div>
                </div>
                <div className='product_price'>
                    <span id='price'>
                        <span id='currency'>$</span>
                        <span>{originalPrice}</span>
                        <span id='original_price'>{`$${newPrice}`}</span>
                    </span>
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
            <div className='product_discount'>
                <span>{discount}% Off</span>
            </div>
        </div>
    );
}

export default Product;