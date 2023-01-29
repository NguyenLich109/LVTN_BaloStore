import React, { memo, useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';

export default memo(function DetailProduct({ products, indexNumber }) {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {products?.map((product, index) => {
                    return (
                        <>
                            {
                                <div
                                    key={index}
                                    data={index}
                                    className={indexNumber === index ? `carousel-item active` : `carousel-item`}
                                >
                                    <img className="d-block w-100" src={`/productImage/${product?.image}`} alt=""></img>
                                </div>
                            }
                        </>
                    );
                })}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon css-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon css-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
});
