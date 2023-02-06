import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';
import OrderReceive from '../components/orders/OrderReceive';

const OrderReceiveScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber;
    const status = match.params.status;
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <OrderReceive keyword={keyword} status={status} pageNumber={pageNumber} />
            </main>
        </>
    );
};

export default OrderReceiveScreen;
