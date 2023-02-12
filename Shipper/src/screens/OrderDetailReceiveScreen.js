import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';
import OrderReceiveDetailmain from '../components/orders/OrderReceiveDetailmain';

export default function OrderDetailReceiveScreen({ match }) {
    const orderId = match.params.id;
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <OrderReceiveDetailmain orderId={orderId} />
            </main>
        </>
    );
}
