import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';
import MainDiscount from './../components/Discount/MainDiscount';

export default function DiscountScreen() {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <MainDiscount />
            </main>
        </>
    );
}
