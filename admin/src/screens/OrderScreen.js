import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';
import OrderMain from '../components/orders/OrderMain';

const OrderScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber;
    const status = match.params.status;
    const date1 = match.params.time1;
    const date2 = match.params.time2;
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <OrderMain keyword={keyword} status={status} pageNumber={pageNumber} date1={date1} date2={date2} />
            </main>
        </>
    );
};

export default OrderScreen;
