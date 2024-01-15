import React from 'react';

/*** Component Imports ***/
import Metadata from 'components/Metadata/Metadata';
import Product from 'components/Product/Product';
import Carousel from 'components/Carousel/Carousel';

/*** Hook Imports ***/
import useAxios from 'hooks/useAxios';

import data from 'components/Carousel/data.json';

function LandingPage() {

    const { data: products, loading, error } = useAxios({url:'http://localhost:9010/api/v1/products/'});
    console.log(products, loading, error);

    return (
        <>
            <Metadata title='Buy Best Products Online' />
            <div className='container'>
                <div className="row">
                    <h1 id="products_heading" className="text-secondary">Latest Products</h1>
                    <div>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4  col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4  col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4  col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4  col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4  col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4  col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4  col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4  col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4  col-xl-3'>
                                <Product />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3'>
                                <Carousel data={data.items} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LandingPage;