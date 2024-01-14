import React from 'react';

/*** Component Imports ***/
import Metadata from 'components/Metadata/Metadata';
import Product from 'components/Product/Product';
import Carousel from 'components/Carousel/Carousel';

import data from 'components/Carousel/data.json';

function LandingPage() {
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