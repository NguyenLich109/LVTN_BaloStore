import React, { useEffect, useState } from 'react';
import OrderDeceiveDetailProducts from './OrderDeceiveDetailProducts';
import OrderDetailInfo from './OrderDetailInfo';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getOrderReceiceDetails,
    paidOrder,
    errorPaidOrder,
    contentPaidErrorOrder,
} from '../../Redux/Actions/OrderActions';
import {
    ORDER_CONTENT_ERROR_PAID_RESET,
    ORDER_DELIVERED_RESET,
    ORDER_PAID_RESET,
    ORDER_ERROR_PAID_RESET,
} from '../../Redux/Constants/OrderConstants';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import moment from 'moment';
import { toast } from 'react-toastify';
import Toast from '../LoadingError/Toast';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

export default function OrderReceiveDetailmain(props) {
    const { orderId } = props;
    const dispatch = useDispatch();

    // const [hiden, setHiden] = useState(true);

    const orderReceiveDetails = useSelector((state) => state.orderReceiveDetails);
    const { loading, error, order } = orderReceiveDetails;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDelivered, success: successDelivered, error: errorDelive } = orderDeliver;
    const orderPaid = useSelector((state) => state.orderPaid);
    const { loading: loadingPaid, success: successPaid, errorPaid } = orderPaid;
    const orderErrorPaid = useSelector((state) => state.orderErrorPaid);
    const { loading: LoadingError, success: successErorr, error: errorPaids } = orderErrorPaid;
    const orderContentErrorPaid = useSelector((state) => state.orderContentErrorPaid);
    const { loading: loadingContent, success: successContent, error: errorContent } = orderContentErrorPaid;
    useEffect(() => {
        dispatch(getOrderReceiceDetails(orderId));
    }, [dispatch, orderId, successDelivered, successPaid, successErorr, successContent]);

    const [status, setStatus] = useState('Tr???ng th??i');

    useEffect(() => {
        if (errorDelive) {
            toast.error(errorDelive, ToastObjects);
            dispatch({ type: ORDER_DELIVERED_RESET });
        }
        if (errorPaid) {
            toast.error(errorPaid, ToastObjects);
            dispatch({ type: ORDER_PAID_RESET });
        }
        if (errorPaids) {
            toast.error(errorPaids, ToastObjects);
            dispatch({ type: ORDER_ERROR_PAID_RESET });
        }
        if (errorContent) {
            toast.error(errorContent, ToastObjects);
            dispatch({ type: ORDER_CONTENT_ERROR_PAID_RESET });
        }
    }, [dispatch, errorDelive, errorPaid, errorPaids, errorContent]);

    useEffect(() => {
        if (successDelivered) {
            toast.success('???? c???p nh???n tr???ng th??i th??nh c??ng', ToastObjects);
            dispatch({ type: ORDER_DELIVERED_RESET });
        }
        if (successPaid) {
            toast.success('???? c???p nh???n tr???ng th??i th??nh c??ng', ToastObjects);
            dispatch({ type: ORDER_PAID_RESET });
        }
        if (successErorr) {
            toast.success('???? c???p nh???n tr???ng th??i th??nh c??ng', ToastObjects);
            dispatch({ type: ORDER_ERROR_PAID_RESET });
        }
    }, [dispatch, successDelivered, successPaid, successErorr]);

    useEffect(() => {
        if (successContent) {
            toast.success('B???n ???? c???p nh???t thanh c??ng', ToastObjects);
            dispatch({ type: ORDER_CONTENT_ERROR_PAID_RESET });
        }
    }, [dispatch, successContent]);

    const onHandlePaid = () => {
        if (!order?.isPaid) {
            if (window.confirm('?????ng ?? thanh to??n')) {
                dispatch(paidOrder(order));
            }
        }
    };
    const onHandleErrorPaid = () => {
        if (window.confirm('?????ng ?? thanh to??n b??? h???y')) {
            dispatch(errorPaidOrder(order._id));
        }
    };

    useEffect(() => {
        if (order?.isDelivered === true && order?.isPaid !== true) {
            setStatus('??ang giao');
        }
        if (order?.isPaid === true) {
            setStatus('???? thanh to??n');
        }
        if (order?.errorPaid === true) {
            setStatus('Thanh to??n kh??ng th??nh c??ng');
        }
        return order;
    }, [order]);

    const onHandle = (value) => {
        if (value) {
            dispatch(contentPaidErrorOrder({ id: order._id, content: value }));
        }
    };

    return (
        <section className="content-main">
            <Toast />
            <div className="content-header">
                <div className="col-lg-6 col-md-6">
                    <Link to="/ordersReceive" className="btn btn-dark text-white">
                        Quay l???i
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
                            style={{ width: '250px' }}
                        >
                            {status}
                        </button>
                        <div
                            className="dropdown-menu"
                            style={{ width: '250px', textAlign: 'center' }}
                            aria-labelledby="dropdownMenuButton"
                        >
                            <button className="dropdown-item" style={{ padding: '5px 0' }}>
                                ??ang giao
                            </button>
                            {order?.isDelivered && (
                                <button className="dropdown-item" style={{ padding: '5px 0' }} onClick={onHandlePaid}>
                                    Thanh to??n
                                </button>
                            )}
                            {order?.isDelivered && !order?.isPaid && (
                                <button
                                    className="dropdown-item"
                                    style={{ padding: '5px 0' }}
                                    onClick={onHandleErrorPaid}
                                >
                                    Thanh to??n kh??ng th??nh c??ng
                                </button>
                            )}
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
                    {(loadingDelivered || loadingPaid || LoadingError || loadingContent) && <Loading />}
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
                                <small className="text-black mx-3 ">ID ????n h??ng: {order._id}</small>
                            </div>
                        </div>
                    </header>
                    <div className="card-body">
                        {/* Order info */}
                        <OrderDetailInfo order={order} />

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <OrderDeceiveDetailProducts
                                        order={order}
                                        loading={loading}
                                        content={order?.content}
                                        onHandle={onHandle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
