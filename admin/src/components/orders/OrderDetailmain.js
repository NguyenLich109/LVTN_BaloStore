import React, { useEffect, useState } from 'react';
import OrderDetailProducts from './OrderDetailProducts';
import OrderDetailInfo from './OrderDetailInfo';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    cancelOrder,
    deliverOrder,
    getOrderDetails,
    paidOrder,
    waitConfirmationOrder,
    completeAdminOrder,
    orderErrorPaidAction,
    orderContentPaidAction,
    orderGuaranteeAction,
    orderNoteGuaranteeAction,
} from '../../Redux/Actions/OrderActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import moment from 'moment';
// modal
import CancelModal from '../Modal/CancelModal';

const OrderDetailmain = (props) => {
    const { orderId } = props;
    const dispatch = useDispatch();
    // modal
    const [cancel, setCancel] = useState(false);

    // const [hiden, setHiden] = useState(true);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;

    // const orderUser = useSelector((state) => state.orderPaid);
    // console.log(orderUser);
    const orderwaitGetConfirmation = useSelector((state) => state.orderwaitGetConfirmation);
    const { success: successwaitGetConfirmation } = orderwaitGetConfirmation;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDelivered, success: successDelivered } = orderDeliver;
    const orderPaid = useSelector((state) => state.orderPaid);
    const { loading: loadingPaid, success: successPaid } = orderPaid;
    const orderGetcompleteAdmin = useSelector((state) => state.orderGetcompleteAdmin);
    const { success: successCompleteAdmin } = orderGetcompleteAdmin;
    const orderCancel = useSelector((state) => state.orderCancel);
    const { loading: loadingCancel, success: successCancel } = orderCancel;
    const orderErrorPaidReducer = useSelector((state) => state.orderErrorPaidReducer);
    const { loading: loadingErrorPaid, success: successErrorPaid } = orderErrorPaidReducer;
    const orderContentErrorPaidReducer = useSelector((state) => state.orderContentErrorPaidReducer);
    const { loading: loadingContentErrorPaid, success: successContentErrorPaid } = orderContentErrorPaidReducer;
    const orderGuaranteeReducer = useSelector((state) => state.orderGuaranteeReducer);
    const { loading: loadingOrderGuarantee, success: successOrderGuarantee } = orderGuaranteeReducer;
    const orderNoteGuaranteeReducer = useSelector((state) => state.orderNoteGuaranteeReducer);
    const { loading: loadingOrderNoteGuarantee, success: successOrderNoteGuarantee } = orderNoteGuaranteeReducer;
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [
        dispatch,
        orderId,
        successDelivered,
        successPaid,
        successCancel,
        successwaitGetConfirmation,
        successCompleteAdmin,
        successErrorPaid,
        successContentErrorPaid,
        successOrderGuarantee,
        successOrderNoteGuarantee,
    ]);

    // const cancelOrderHandler = () => {
    //     if (window.confirm('Bạn có chắc muốn hủy đơn hàng này??')) {
    //         dispatch(cancelOrder(order));
    //     }
    // };
    const setTrueCancel = () => {
        setCancel(true);
    };
    const setFalseCancel = () => {
        setCancel(false);
    };
    const [status, setStatus] = useState('Trạng thái');
    useEffect(() => {
        if (order?.waitConfirmation !== true) {
            setStatus('Trạng thái');
        }
        if (order?.waitConfirmation === true && order?.isDelivered !== true) {
            setStatus('Xác nhận');
        }
        if (order?.isDelivered === true && order?.isPaid !== true) {
            setStatus('Giao hàng');
        }
        if (order?.isPaid === true && order?.completeAdmin !== true) {
            setStatus('Thanh toán');
        }
        if (order?.errorPaid === true && order?.completeAdmin !== true) {
            setStatus('Thanh toán không thành công');
        }
        if (order?.completeAdmin === true) {
            setStatus('Hoàn tất');
        }
        if (order?.isGuarantee === true) {
            setStatus('Bảo hành sản phẩm');
        }
        return order;
    }, [order]);
    const cancelOrderHandler1 = () => {
        setCancel(false);
        dispatch(cancelOrder(order));
    };

    const handleConfirm = () => {
        if (order?.waitConfirmation !== true) {
            if (window.confirm('Đồng ý xác nhận')) {
                dispatch(waitConfirmationOrder(order._id, true));
            }
        }
    };
    const handleDelivery = () => {
        if (order?.isDelivered !== true) {
            if (window.confirm('Đồng ý giao hàng')) {
                dispatch(deliverOrder(order));
            }
        }
    };
    const handlePaid = () => {
        if (order?.isPaid !== true) {
            if (window.confirm('Đồng ý thanh toán')) {
                dispatch(paidOrder(order));
            }
        }
    };
    const handleErrorPaid = () => {
        if (order?.errorPaid !== true) {
            if (window.confirm('Đồng ý thanh toán không hoàn thành')) {
                dispatch(orderErrorPaidAction(order._id));
            }
        }
    };
    const handleSuccess = () => {
        if (order?.completeAdmin !== true) {
            if (window.confirm('Đồng ý hoàn tất')) {
                dispatch(completeAdminOrder(order._id));
            }
        }
    };
    const handleGuarantee = () => {
        if (!order?.isGuarantee) {
            if (window.confirm('Bạn có muốn bảo hành sản phẩm này không')) {
                dispatch(orderGuaranteeAction(order._id));
            }
        }
    };

    const onErrorContent = (data) => {
        if (order?.errorPaid) {
            dispatch(orderContentPaidAction({ id: order?._id, content: data }));
        }
    };

    const onNoteGuarantee = (data) => {
        if (order?.isGuarantee) {
            dispatch(orderNoteGuaranteeAction({ id: order?._id, note: data }));
        }
    };
    return (
        <section className="content-main">
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
                {order?.waitConfirmation && order?.isDelivered !== true && (
                    <div className="col-lg-3 col-md-3 d-flex justify-content-end">
                        <button
                            className="btn btn-success text-white"
                            onClick={() => {
                                if (window.confirm('Đồng ý thu hồi')) {
                                    dispatch(waitConfirmationOrder(order._id, false));
                                    setStatus('Trạng thái');
                                } else {
                                    setStatus('Xác nhận');
                                }
                            }}
                        >
                            Thu hồi
                        </button>
                    </div>
                )}
                <div className="col-lg-2 col-md-2">
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
                        {order?.cancel !== 1 && (
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                                style={{ width: '250px', textAlign: 'center' }}
                            >
                                <button className="dropdown-item dropdown-item__padding " onClick={handleConfirm}>
                                    Xác nhận
                                </button>
                                {order?.waitConfirmation && (
                                    <button className="dropdown-item dropdown-item__padding" onClick={handleDelivery}>
                                        Giao hàng
                                    </button>
                                )}
                                {order?.isDelivered && (
                                    <button className="dropdown-item dropdown-item__padding" onClick={handlePaid}>
                                        Thanh toán
                                    </button>
                                )}
                                {order?.isDelivered && !order?.isPaid && (
                                    <button className="dropdown-item dropdown-item__padding" onClick={handleErrorPaid}>
                                        Thanh toán không thành công
                                    </button>
                                )}
                                {order?.isPaid && (
                                    <button className="dropdown-item dropdown-item__padding" onClick={handleSuccess}>
                                        Hoàn tất
                                    </button>
                                )}
                                {order?.completeUser && (
                                    <button className="dropdown-item" onClick={handleGuarantee}>
                                        Bảo hành sản phẩm
                                    </button>
                                )}
                            </div>
                        )}
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
                                    <OrderDetailProducts
                                        order={order}
                                        loading={loading}
                                        onErrorContent={onErrorContent}
                                        onNoteGuarantee={onNoteGuarantee}
                                    />
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
