import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { listOrders } from '../../Redux/Actions/OrderActions';
import { useSelector, useDispatch } from 'react-redux';
import PaginatorOrder from './PaginatorOrder';

const Orders = (props) => {
    const { keyword, status, pageNumber } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders, page, pages } = orderList;

    const [kewywordSearch, setKewywordSearch] = useState('');
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [retultdate1, setRetultDate1] = useState('');
    const [retultdate2, setRetultDate2] = useState('');

    // const [keyword, setKeyword] = useState('');

    // useEffect(() => {
    //     if (time1 && time2) {
    //         if (time1) {
    //             const date = new Date(time1);
    //             const isoDate = date.toISOString();
    //             if (isoDate) {
    //                 setDate1(isoDate);
    //                 setRetultDate1(time1);
    //             }
    //         }
    //         if (time2) {
    //             let x = `${time2}T23:59:00`;
    //             const date = new Date(x);
    //             const isoDate = date.toISOString();
    //             if (isoDate) {
    //                 setDate2(isoDate);
    //                 setRetultDate2(time2);
    //             }
    //         }
    //     }
    // }, [time1, time2]);
    useEffect(() => {
        dispatch(listOrders(keyword, status, pageNumber));
    }, [dispatch, status, keyword, pageNumber]);

    const handleStatus = (value) => {
        if (keyword) {
            history.push(`/orders/search/${keyword}/status/${value.target.value}`);
        } else {
            history.push(`/orders/status/${value.target.value}`);
        }
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (kewywordSearch.trim() && kewywordSearch) {
            history.push(`/orders/search/${kewywordSearch}`);
        } else {
            history.push(`/orders`);
        }
    };
    const handleDate = () => {
        if (date1 && date2) {
            dispatch(listOrders(keyword, status, pageNumber, date1, date2));
        }
    };
    const handleDate1 = (data) => {
        const date = new Date(data);
        const isoDate = date.toISOString();
        if (isoDate) {
            setDate1(isoDate);
            setRetultDate1(data);
        }
    };
    const handleDate2 = (data) => {
        let x = `${data}T23:59:59`;
        const date = new Date(x);
        const isoDate = date.toISOString();
        if (isoDate) {
            setDate2(isoDate);
            setRetultDate2(data);
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
                    <div className="d-flex justify-content-between align-items-center">
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
                        <div className="col-lg-8 col-xl-8 d-flex justify-content-end">
                            <div className="row">
                                <div className="col-lg-8 col-xl-8 d-flex justify-content-end">
                                    <button className="btn btn-light" style={{ margin: '0 5px' }} onClick={handleDate}>
                                        Cập nhật
                                    </button>
                                    <input
                                        className="form-control search-date"
                                        style={{ margin: '0 5px' }}
                                        type="date"
                                        value={retultdate1}
                                        onChange={(e) => handleDate1(e.target.value)}
                                    ></input>
                                    <input
                                        className="form-control search-date"
                                        style={{ margin: '0 5px' }}
                                        value={retultdate2}
                                        onChange={(e) => handleDate2(e.target.value)}
                                        type="date"
                                    ></input>
                                </div>
                                <div className="col-lg-4 col-xl-4">
                                    <select className="form-select" value={status} onChange={handleStatus}>
                                        <option value={'0'}>Lựa chọn...</option>
                                        <option value={'1'}>Chờ xác nhận</option>
                                        <option value={'2'}>Đã xác nhận</option>
                                        <option value={'3'}>Giao hàng</option>
                                        <option value={'4'}>Thanh toán</option>
                                        <option value={'5'}>Hoàn tất</option>
                                        <option value={'7'}>Thanh toán không thành công</option>
                                        <option value={'6'}>Hủy đơn</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Người mua</th>
                                <th scope="col">Email</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Thanh toán</th>
                                <th scope="col">Thời gian mua</th>
                                <th>Trạng thái</th>
                                <th>Người nhận giao hàng</th>
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
                                    <td>{order.email}</td>
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
                                        ) : order?.errorPaid ? (
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
                                        {order?.cancel !== 1 ? (
                                            order?.waitConfirmation &&
                                            order?.isDelivered &&
                                            order?.isPaid &&
                                            order?.completeUser &&
                                            order?.completeAdmin &&
                                            order?.isGuarantee ? (
                                                <span className="badge alert-warning">
                                                    Bảo hành sản phẩm {moment(order?.isGuaranteeAt).hours()}
                                                    {':'}
                                                    {moment(order?.isGuaranteeAt).minutes() < 10
                                                        ? `0${moment(order?.isGuaranteeAt).minutes()}`
                                                        : moment(order?.isGuaranteeAt).minutes()}{' '}
                                                    {moment(order?.isGuaranteeAt).format('DD/MM/YYYY')}{' '}
                                                </span>
                                            ) : order?.completeAdmin ? (
                                                <span className="badge rounded-pill alert-success">
                                                    Hoàn tất {moment(order?.completeAdminAt).hours()}
                                                    {':'}
                                                    {moment(order?.completeAdminAt).minutes() < 10
                                                        ? `0${moment(order?.completeAdminAt).minutes()}`
                                                        : moment(order?.completeAdminAt).minutes()}{' '}
                                                    {moment(order?.completeAdminAt).format('DD/MM/YYYY')}{' '}
                                                </span>
                                            ) : order?.waitConfirmation && order?.isDelivered && order?.isPaid ? (
                                                <span className="badge alert-success">
                                                    Đã thanh toán {moment(order?.paidAt).hours()}
                                                    {':'}
                                                    {moment(order?.paidAt).minutes() < 10
                                                        ? `0${moment(order?.paidAt).minutes()}`
                                                        : moment(order?.paidAt).minutes()}{' '}
                                                    {moment(order?.paidAt).format('DD/MM/YYYY')}{' '}
                                                </span>
                                            ) : order?.errorPaid && order?.waitConfirmation && order?.isDelivered ? (
                                                <span className="badge alert-danger">
                                                    Thanh toán không thành công {moment(order?.errorPaidAt).hours()}
                                                    {':'}
                                                    {moment(order?.errorPaidAt).minutes() < 10
                                                        ? `0${moment(order?.errorPaidAt).minutes()}`
                                                        : moment(order?.errorPaidAt).minutes()}{' '}
                                                    {moment(order?.errorPaidAt).format('DD/MM/YYYY')}{' '}
                                                </span>
                                            ) : order?.waitConfirmation && order?.isDelivered ? (
                                                <span className="badge alert-warning">
                                                    Đang giao {moment(order?.deliveredAt).hours()}
                                                    {':'}
                                                    {moment(order?.deliveredAt).minutes() < 10
                                                        ? `0${moment(order?.deliveredAt).minutes()}`
                                                        : moment(order?.deliveredAt).minutes()}{' '}
                                                    {moment(order?.deliveredAt).format('DD/MM/YYYY')}{' '}
                                                </span>
                                            ) : order?.waitConfirmation ? (
                                                <span className="badge alert-warning">
                                                    Đã xác nhận {moment(order?.waitConfirmationAt).hours()}
                                                    {':'}
                                                    {moment(order?.waitConfirmationAt).minutes() < 10
                                                        ? `0${moment(order?.waitConfirmationAt).minutes()}`
                                                        : moment(order?.waitConfirmationAt).minutes()}{' '}
                                                    {moment(order?.waitConfirmationAt).format('DD/MM/YYYY')}{' '}
                                                </span>
                                            ) : (
                                                <span className="badge alert-danger">
                                                    Chờ xác nhận {moment(order?.createdAt).hours()}
                                                    {':'}
                                                    {moment(order?.createdAt).minutes() < 10
                                                        ? `0${moment(order?.createdAt).minutes()}`
                                                        : moment(order?.createdAt).minutes()}{' '}
                                                    {moment(order?.createdAt).format('DD/MM/YYYY')}{' '}
                                                </span>
                                            )
                                        ) : (
                                            <span className="badge bg-dark">Đơn này đã bị hủy</span>
                                        )}
                                    </td>
                                    <th>
                                        <span className="badge alert-success">
                                            {order?.isDelivered
                                                ? order?.userNv
                                                    ? order?.userNv?.name
                                                    : 'Bên thứ 3 vận chuyển'
                                                : ''}{' '}
                                            {order?.isDelivered && moment(order?.deliveredAt).hours()}
                                            {order?.isDelivered && ':'}
                                            {order?.isDelivered &&
                                                (moment(order?.deliveredAt).minutes() < 10
                                                    ? `0${moment(order?.deliveredAt).minutes()}`
                                                    : moment(order?.deliveredAt).minutes())}{' '}
                                            {order?.isDelivered && moment(order?.deliveredAt).format('DD/MM/YYYY')}
                                        </span>
                                    </th>
                                    <td className="d-flex justify-content-end align-item-center">
                                        <Link to={`/order/${order._id}`} className="text-success">
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

export default Orders;
