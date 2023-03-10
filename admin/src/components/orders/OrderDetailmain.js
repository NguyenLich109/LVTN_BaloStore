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
    const { success: successDelivered } = orderDeliver;
    const orderPaid = useSelector((state) => state.orderPaid);
    const { success: successPaid } = orderPaid;
    const orderGetcompleteAdmin = useSelector((state) => state.orderGetcompleteAdmin);
    const { success: successCompleteAdmin } = orderGetcompleteAdmin;
    const orderCancel = useSelector((state) => state.orderCancel);
    const { success: successCancel } = orderCancel;
    const orderErrorPaidReducer = useSelector((state) => state.orderErrorPaidReducer);
    const { success: successErrorPaid } = orderErrorPaidReducer;
    const orderContentErrorPaidReducer = useSelector((state) => state.orderContentErrorPaidReducer);
    const { success: successContentErrorPaid } = orderContentErrorPaidReducer;
    const orderGuaranteeReducer = useSelector((state) => state.orderGuaranteeReducer);
    const { success: successOrderGuarantee } = orderGuaranteeReducer;
    const orderNoteGuaranteeReducer = useSelector((state) => state.orderNoteGuaranteeReducer);
    const { success: successOrderNoteGuarantee } = orderNoteGuaranteeReducer;
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
    //     if (window.confirm('B???n c?? ch???c mu???n h???y ????n h??ng n??y??')) {
    //         dispatch(cancelOrder(order));
    //     }
    // };
    const setTrueCancel = () => {
        setCancel(true);
    };
    const setFalseCancel = () => {
        setCancel(false);
    };
    const [status, setStatus] = useState('Tr???ng th??i');
    useEffect(() => {
        if (order?.waitConfirmation !== true) {
            setStatus('Tr???ng th??i');
        }
        if (order?.waitConfirmation === true && order?.isDelivered !== true) {
            setStatus('X??c nh???n');
        }
        if (order?.isDelivered === true && order?.isPaid !== true) {
            setStatus('Giao h??ng');
        }
        if (order?.isPaid === true && order?.completeAdmin !== true) {
            setStatus('Thanh to??n');
        }
        if (order?.errorPaid === true && order?.completeAdmin !== true) {
            setStatus('Thanh to??n kh??ng th??nh c??ng');
        }
        if (order?.completeAdmin === true) {
            setStatus('Ho??n t???t');
        }
        if (order?.isGuarantee === true) {
            setStatus('B???o h??nh s???n ph???m');
        }
        return order;
    }, [order]);
    const cancelOrderHandler1 = () => {
        setCancel(false);
        dispatch(cancelOrder(order));
    };

    const handleConfirm = () => {
        if (order?.waitConfirmation !== true) {
            if (window.confirm('?????ng ?? x??c nh???n')) {
                dispatch(waitConfirmationOrder(order._id, true));
            }
        }
    };
    const handleDelivery = () => {
        if (order?.isDelivered !== true) {
            if (window.confirm('?????ng ?? giao h??ng')) {
                dispatch(deliverOrder(order));
            }
        }
    };
    const handlePaid = () => {
        if (order?.isPaid !== true) {
            if (window.confirm('?????ng ?? thanh to??n')) {
                dispatch(paidOrder(order));
            }
        }
    };
    const handleErrorPaid = () => {
        if (order?.errorPaid !== true) {
            if (window.confirm('?????ng ?? thanh to??n kh??ng ho??n th??nh')) {
                dispatch(orderErrorPaidAction(order._id));
            }
        }
    };
    const handleSuccess = () => {
        if (order?.completeAdmin !== true) {
            if (window.confirm('?????ng ?? ho??n t???t')) {
                dispatch(completeAdminOrder(order._id));
            }
        }
    };
    const handleGuarantee = () => {
        if (!order?.isGuarantee) {
            if (window.confirm('B???n c?? mu???n b???o h??nh s???n ph???m n??y kh??ng')) {
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
                    Title="H???y ????n h??ng"
                    Body="B???n c?? ch???c ch???n h???y ????n h??ng n??y kh??ng?"
                    HandleSubmit={cancelOrderHandler1}
                    Close="modal"
                    setFalseCancel={setFalseCancel}
                />
            )}
            <div className="content-header">
                <div className="col-lg-6 col-md-6">
                    <Link to="/orders" className="btn btn-dark text-white">
                        Quay l???i
                    </Link>
                </div>
                {order?.waitConfirmation && order?.isDelivered !== true && (
                    <div className="col-lg-3 col-md-3 d-flex justify-content-end">
                        <button
                            className="btn btn-success text-white"
                            onClick={() => {
                                if (window.confirm('?????ng ?? thu h???i')) {
                                    dispatch(waitConfirmationOrder(order._id, false));
                                    setStatus('Tr???ng th??i');
                                } else {
                                    setStatus('X??c nh???n');
                                }
                            }}
                        >
                            Thu h???i
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
                                    X??c nh???n
                                </button>
                                {order?.waitConfirmation && (
                                    <button className="dropdown-item dropdown-item__padding" onClick={handleDelivery}>
                                        Giao h??ng
                                    </button>
                                )}
                                {order?.isDelivered && (
                                    <button className="dropdown-item dropdown-item__padding" onClick={handlePaid}>
                                        Thanh to??n
                                    </button>
                                )}
                                {order?.isDelivered && !order?.isPaid && (
                                    <button className="dropdown-item dropdown-item__padding" onClick={handleErrorPaid}>
                                        Thanh to??n kh??ng th??nh c??ng
                                    </button>
                                )}
                                {order?.isPaid && (
                                    <button className="dropdown-item dropdown-item__padding" onClick={handleSuccess}>
                                        Ho??n t???t
                                    </button>
                                )}
                                {order?.completeUser && (
                                    <button className="dropdown-item" onClick={handleGuarantee}>
                                        B???o h??nh s???n ph???m
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
                                <small className="text-black mx-3 ">ID ????n h??ng: {order._id}</small>
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
                                        H???y ????n h??ng n??y
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
