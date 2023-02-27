import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, getGiftAction, addGiftAction } from '../Redux/Actions/userActions';
import { ADD_GIFT_RESET } from '../Redux/Constants/UserContants';
import Header from '../components/Header';
import Orders from './../components/profileComponents/Orders';
import moment from 'moment';
import { listMyOrders } from '../Redux/Actions/OrderActions';
import { Link } from 'react-router-dom';
import './style/gift.css';
import Loading from '../components/LoadingError/Loading';
import Toast from '../components/LoadingError/Toast';
import { toast } from 'react-toastify';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

export default function GiftScreen() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userDetail = useSelector((state) => state.userDetails);
    const { user } = userDetail;
    const getGiftReducer = useSelector((state) => state.getGiftReducer);
    const { loading, giftall } = getGiftReducer;
    const addGiftReducer = useSelector((state) => state.addGiftReducer);
    const { loading: loadingAdd, success: successAdd, error: errorAdd } = addGiftReducer;
    const [check, setCheck] = useState(1);
    const [buleanOrder, setBuleanOrder] = useState(true);

    //get image
    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getGiftAction());
    }, [dispatch]);

    useEffect(() => {
        if (successAdd) {
            toast.success('Đã thêm thành công', Toastobjects);
            dispatch(getUserDetails());
            dispatch({ type: ADD_GIFT_RESET });
        }
        if (errorAdd) {
            toast.error(errorAdd, Toastobjects);
            dispatch({ type: ADD_GIFT_RESET });
        }
    }, [dispatch, successAdd, errorAdd]);

    const handleSubmit = (data) => {
        if (data) {
            const date = new Date(`${data.date2}T${data.date1}:00`).toISOString();
            dispatch(
                addGiftAction({ id: userInfo._id, gift: data.nameDiscount, date: date, price: data.priceDiscount }),
            );
        }
    };
    return (
        <>
            <Header />
            <div className="container mt-lg-5 mt-3">
                <div className="row align-items-start">
                    <div className="col-lg-4 p-0 ">
                        <div className="author-card pb-0">
                            <div
                                className="row fix-culum"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    className="col-md-4"
                                    style={{
                                        marginTop: '12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        src={
                                            userInfo?.image !== undefined
                                                ? `/userProfile/${userInfo?.image}`
                                                : './images/user.png'
                                        }
                                        alt=""
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '100%',
                                            objectFit: 'cover',
                                            flexShrink: '0',
                                            marginBottom: '5px',
                                        }}
                                        className="fix-none"
                                    />
                                    {/* Nút button Avatar */}
                                </div>
                                <div className="col-md-8">
                                    <h5 className="author-card-name mb-2">
                                        <strong>{userInfo.name}</strong>
                                    </h5>
                                    <span className="author-card-position">
                                        <>Ngày tham gia: {moment(userInfo.createdAt).format('DD/MM/YYYY')}</>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="wizard pt-3 fix-top" style={{ marginTop: '10px' }}>
                            <div class="d-flex align-items-start">
                                <div
                                    class="nav align-items-start flex-column col-12 nav-pills me-3 "
                                    id="v-pills-tab"
                                    role="tablist"
                                    aria-orientation="vertical"
                                >
                                    <button
                                        class="nav-link"
                                        style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}
                                    >
                                        <div style={{ fontSize: '18px', paddingRight: '10px' }}>
                                            <i class="fas fa-cogs"></i>
                                        </div>
                                        <Link to="/profile"> Hồ Sơ Cá Nhân</Link>
                                    </button>

                                    <button
                                        class="nav-link"
                                        style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}
                                    >
                                        <div style={{ fontSize: '18px', paddingRight: '10px' }}>
                                            <i class="fas fa-shopping-cart"></i>
                                        </div>
                                        <Link to="/byproduct"> Danh Sách Mua Hàng</Link>
                                    </button>
                                    <button
                                        // class="nav-link d-flex"
                                        className={buleanOrder ? 'nav-link d-flex color-red' : 'nav-link d-flex'}
                                        id="v-pills-profile-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#v-pills-profile"
                                        type="button"
                                        role="tab"
                                        aria-controls="v-pills-profile"
                                        aria-selected="false"
                                        style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}
                                    >
                                        <div style={{ fontSize: '18px', paddingRight: '10px' }}>
                                            <i class="fas fa-gift"></i>
                                        </div>
                                        Voucher
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* panels */}
                    <div class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3" id="v-pills-tabContent">
                        <div
                            class="tab-pane fade show active"
                            id="v-pills-profile"
                            role="tabpanel"
                            aria-labelledby="v-pills-profile-tab"
                        >
                            <Toast />
                            <div className="button-click__menu d-flex justify-content-end ">
                                <button
                                    className={`btn btn-outline-info active-voucher ${check === 1 ? 'active' : ''}`}
                                    onClick={() => setCheck(1)}
                                >
                                    Kho voucher
                                </button>
                                <button
                                    className={`btn btn-outline-info active-voucher ${check === 2 ? 'active' : ''}`}
                                    onClick={() => setCheck(2)}
                                >
                                    Thêm voucher
                                </button>
                            </div>

                            {check === 1 && (
                                <div className="active-gift">
                                    <h4 className="gift-header">Danh sách voucher:</h4>
                                    {loading && <Loading />}
                                    <div className="row">
                                        {user?.gift?.map((value, index) => (
                                            <div key={index} className="col-sm-6 col-md-6 col-lg-6 col-xl-6	col-xxl-6">
                                                <div className="list-voucher">
                                                    <img src="/images/gift.png"></img>
                                                    <div className="noti-gift">
                                                        <span>Tên mã: {value?.gift}</span>
                                                        <span>Mã giảm giá {value?.price.toLocaleString('de-DE')}đ</span>
                                                        <span>
                                                            Có hiệu lực đến:{' '}
                                                            {`${new Date(value?.date).getHours()}:${new Date(
                                                                value?.date,
                                                            ).getMinutes()} ${new Date(value?.date).getDate()}-${
                                                                new Date(value?.date).getMonth() + 1
                                                            }-${new Date(value?.date).getFullYear()}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {check === 2 && (
                                <div className="active-gift">
                                    <h4 className="gift-header">Danh sách voucher:</h4>
                                    <div className="row">
                                        {giftall?.map((value, index) => (
                                            <div key={index} className="col-sm-6 col-md-6 col-lg-6 col-xl-6	col-xxl-6">
                                                <div className="list-voucher flex-voucher">
                                                    <img src="/images/gift.png"></img>
                                                    <div className="noti-gift">
                                                        <span>Tên mã: {value?.nameDiscount}</span>
                                                        <span>
                                                            Mã giảm giá {value?.priceDiscount.toLocaleString('de-DE')}đ
                                                        </span>
                                                        <span>
                                                            Có hiệu lực đến: {value?.date1}{' '}
                                                            {`${new Date(value?.date2).getDate()}-${
                                                                new Date(value?.date2).getMonth() + 1
                                                            }-${new Date(value?.date2).getFullYear()}`}
                                                        </span>
                                                    </div>
                                                    <button
                                                        className="btn btn-light btn-sm"
                                                        onClick={() => handleSubmit(value)}
                                                    >
                                                        Nhận mã
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
