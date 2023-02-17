import React, { useEffect, useState } from 'react';
import OrderDetailProducts from './OrderDetailProducts';
import OrderDetailInfo from './OrderDetailInfo';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, deliverOrder, getOrderDetails } from '../../Redux/Actions/OrderActions';
import { ORDER_DELIVERED_RESET } from '../../Redux/Constants/OrderConstants';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import moment from 'moment';
// modal
import CancelModal from '../Modal/CancelModal';
import { toast } from 'react-toastify';
import Toast from '../LoadingError/Toast';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const OrderDetailmain = (props) => {
    const { orderId } = props;
    const dispatch = useDispatch();
    // modal
    const [cancel, setCancel] = useState(false);

    // const [hiden, setHiden] = useState(true);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDelivered, success: successDelivered, error: errorDelivered } = orderDeliver;

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId, successDelivered]);

    useEffect(() => {
        if (errorDelivered) {
            toast.error(errorDelivered, ToastObjects);
            dispatch({ type: ORDER_DELIVERED_RESET });
        }
    }, [dispatch, errorDelivered]);

    useEffect(() => {
        if (successDelivered) {
            toast.success('Cập nhật trạng thái thành công', ToastObjects);
            dispatch({ type: ORDER_DELIVERED_RESET });
        }
    }, [dispatch, successDelivered]);

    const setTrueCancel = () => {
        setCancel(true);
    };
    const setFalseCancel = () => {
        setCancel(false);
    };
    const [status, setStatus] = useState('');

    const onHandleDelivery = () => {
        if (window.confirm('Đồng ý giao hàng')) {
            dispatch(deliverOrder(order));
        }
    };
    useEffect(() => {
        if (order?.isDelivered === true && order?.isPaid !== true) {
            setStatus('Nhận đơn hàng');
        }
        if (order?.isDelivered === false) {
            setStatus('Trạng thái');
        }
        return order;
    }, [order]);
    const cancelOrderHandler1 = () => {
        setCancel(false);
        dispatch(cancelOrder(order));
    };
    return (
        <section className="content-main">
            <Toast />
            {cancel && (
                <CancelModal
                    Title="Hủy đơn hàng"
                    Body="Bạn có chắc chắn hủy đơn hàng này không?"
                    HandleSubmit={cancelOrderHandler1}
                    Close="modal"
                    setFalseCancel={setFalseCancel}
                />
            )}
            <div className="content-header">
                <div className="col-lg-6 col-md-6">
                    <Link to="/orders" className="btn btn-dark text-white">
                        Quay lại
                    </Link>
                </div>
                <div className="col-lg-3 col-md-3">
                    <div className="dropdown" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className="btn btn-light dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {status ? status : 'Trạng thái'}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={onHandleDelivery}>
                                Nhận đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <div className="card">
                    <header className="card-header p-3 Header-white">
                        <div className="row align-items-center ">
                            <div className="col-lg-6 col-md-6">
                                <span>
                                    <i className="far fa-calendar-alt mx-2"></i>
                                    <b className="text-black">
                                        {moment(order?.createdAt).hours()}
                                        {':'}
                                        {moment(order?.createdAt).minutes() < 10
                                            ? `0${moment(order?.createdAt).minutes()}`
                                            : moment(order?.createdAt).minutes()}{' '}
                                        {moment(order?.createdAt).format('DD/MM/YYYY')}{' '}
                                    </b>
                                </span>
                                <br />
                                <small className="text-black mx-3 ">ID Đơn hàng: {order._id}</small>
                            </div>
                            {order?.cancel !== 1 && order?.waitConfirmation !== true ? (
                                <div className="col-lg-3 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                                    <button
                                        // onClick={cancelOrderHandler}
                                        onClick={setTrueCancel}
                                        className="btn btn-dark col-12"
                                        style={{ marginBottom: '15px' }}
                                        disabled={order?.waitConfirmation}
                                    >
                                        Hủy đơn hàng này
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </header>
                    <div className="card-body">
                        {/* Order info */}
                        <OrderDetailInfo order={order} />

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <OrderDetailProducts order={order} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OrderDetailmain;
