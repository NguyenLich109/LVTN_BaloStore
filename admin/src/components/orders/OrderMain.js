import React from 'react';
import Orders from './Orders';

const OrderMain = (props) => {
    const { keyword, status, pageNumber, date1, date2 } = props;
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Đơn hàng</h2>
            </div>

            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <Orders keyword={keyword} status={status} pageNumber={pageNumber} date1={date1} date2={date2} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderMain;
