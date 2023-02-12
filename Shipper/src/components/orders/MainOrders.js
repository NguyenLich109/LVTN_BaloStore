import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { getAllOrdersNv } from '../../Redux/Actions/OrderActions';
import { useSelector, useDispatch } from 'react-redux';
import PaginatorOrder from './PaginatorOrder';

const MainOrders = (props) => {
    const { keyword, status, pageNumber } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const getAllOrder = useSelector((state) => state.getAllOrder);
    const { loading, error, orders, page, pages } = getAllOrder;

    const [kewywordSearch, setKewywordSearch] = useState('');
    // const [keyword, setKeyword] = useState('');
    useEffect(() => {
        dispatch(getAllOrdersNv(keyword, status, pageNumber));
    }, [dispatch, status, keyword, pageNumber]);

    const handleStatus = (value) => {
        if (keyword) {
            history.push(`/ordersReceive/search/${keyword}/status/${value.target.value}`);
        } else {
            history.push(`/ordersReceive/status/${value.target.value}`);
        }
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (kewywordSearch.trim() && kewywordSearch) {
            history.push(`/ordersReceive/search/${kewywordSearch}`);
        } else {
            history.push(`/ordersReceive`);
        }
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <>
                    <div className="d-flex justify-content-between">
                        <div className="col-lg-2 col-3 col-md-3 ms-2">
                            <form onSubmit={handleSearch}>
                                <div className="input-group" style={{ alignItems: 'center' }}>
                                    <input
                                        type="search"
                                        placeholder="Tìm kiếm..."
                                        className="form-control p-2"
                                        onChange={(e) => {
                                            setKewywordSearch(e.target.value);
                                        }}
                                    />
                                    <button className="btn btn-light bg" type="submit" style={{ height: '42px' }}>
                                        <i className="far fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-2 col-3 col-md-3 me-2">
                            <select className="form-select" value={status} onChange={handleStatus}>
                                <option value={'3'}>Đang giao</option>
                                <option value={'4'}>Thanh toán</option>
                                <option value={'7'}>Thanh toán không thành công</option>
                            </select>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Tên</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Thanh toán</th>
                                <th scope="col">Thời gian nhận đơn</th>
                                <th>Trạng thái</th>
                                <th scope="col" className="text-end">
                                    Quản lý
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <b>{order.name}</b>
                                    </td>
                                    <td>{order.phone}</td>
                                    <td>{Number(order?.totalPrice)?.toLocaleString('de-DE')}đ</td>
                                    <td>
                                        {order.isPaid ? (
                                            <span className="badge rounded-pill alert-success">
                                                Thanh toán {moment(order?.paidAt).hours()}
                                                {':'}
                                                {moment(order?.paidAt).minutes() < 10
                                                    ? `0${moment(order?.paidAt).minutes()}`
                                                    : moment(order?.paidAt).minutes()}{' '}
                                                {moment(order?.paidAt).format('DD/MM/YYYY')}{' '}
                                            </span>
                                        ) : order.errorPaid ? (
                                            <span className="badge rounded-pill alert-danger">
                                                Thanh toán không thành công
                                            </span>
                                        ) : (
                                            <span className="badge rounded-pill alert-danger">Chờ thanh toán</span>
                                        )}
                                    </td>
                                    <td className="badge rounded-pill alert-success">
                                        {moment(order?.createdAt).hours()}
                                        {':'}
                                        {moment(order?.createdAt).minutes() < 10
                                            ? `0${moment(order?.createdAt).minutes()}`
                                            : moment(order?.createdAt).minutes()}{' '}
                                        {moment(order?.createdAt).format('DD/MM/YYYY')}{' '}
                                    </td>
                                    <td>
                                        {order?.isDelivered && order?.isPaid ? (
                                            <span className="badge rounded-pill alert-success">Đã thanh toán</span>
                                        ) : order?.isDelivered && !order.errorPaid ? (
                                            <span className="badge alert-success">Đang giao</span>
                                        ) : (
                                            <span className="badge alert-danger">Thanh toán không thành công</span>
                                        )}
                                    </td>
                                    <td className="d-flex justify-content-end align-item-center">
                                        <Link to={`/orderReceive/${order._id}`} className="text-success">
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <PaginatorOrder
                        pages={pages}
                        page={page}
                        status={status ? status : ''}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    );
};

export default MainOrders;
