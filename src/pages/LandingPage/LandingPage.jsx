import React, { useEffect, useState } from 'react';

/*** CSS Imports ***/
import './LandingPage.css';

/*** Component Imports ***/
import Metadata from 'components/Metadata/Metadata';
import Product from 'components/Product/Product';
import Carousel from 'components/Carousel/Carousel';

/*** Hook Imports ***/
import useAxios from 'hooks/useAxios';

import data from 'components/Carousel/data.json';

function LandingPage() {

    /* useState */
    const [products, setProducts] = useState([]);

    /* Custom Hooks */
    const { fetch, response, loading, error } = useAxios();

    /* useEffect */
    useEffect(() => {
        fetch('/api/v1/products');
    }, []);

    useEffect(() => {
        if (response?.status === 200) {
            setProducts(response.data?.data);
        }
    }, [response]);

    return (
        <div className='landing px-2 py-3'>
            <Metadata title='Buy Best Products Online' />
            <div className="row">
                <h1 id="products_heading" className="text-secondary">Latest Products</h1>
                <div>
                    <div className='row'>
                        {
                            products.map((product, index) => (
                                <div key={index}
                                    className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                                    <Product data={product} />
                                </div>
                            ))
                        }
                        <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                            <Carousel data={data.items} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;