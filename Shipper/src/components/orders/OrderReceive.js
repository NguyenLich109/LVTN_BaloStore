import React from 'react';
import MainOrders from './MainOrders';

export default function OrderReceive(props) {
    const { keyword, status, pageNumber } = props;
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Đơn hàng đã nhận</h2>
            </div>

            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <MainOrders keyword={keyword} status={status} pageNumber={pageNumber} />
                    </div>
                </div>
            </div>
        </section>
    );
}
