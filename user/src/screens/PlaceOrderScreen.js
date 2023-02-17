import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearFromCart, listCart } from '../Redux/Actions/cartActions';
import { createOrder } from '../Redux/Actions/OrderActions';
import { ORDER_CREATE_RESET } from '../Redux/Constants/OrderConstants';
import Header from './../components/Header';
import Message from './../components/LoadingError/Error';
import PayModal from '../components/Modal/PayModal';
import { toast } from 'react-toastify';
import Loading from '../components/LoadingError/Loading';
import Toast from '../components/LoadingError/Toast';
import { getUserDetails } from '../Redux/Actions/userActions';
import { checkDiscountAction } from '../Redux/Actions/DiscountAction';
import { CHECK_DISCOUNT_RESET } from '../Redux/Constants/DiscountConstants';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const PlaceOrderScreen = ({ history }) => {
    // window.scrollTo(0, 0);
    const dispatch = useDispatch();

    const [checkBoolean, setCheckBoolean] = useState(false);
    const [nameDiscount, setNameDiscount] = useState('');

    const checkDiscountReducer = useSelector((state) => state.checkDiscountReducer);
    const { loading: loadingCheck, success: successCheck, error: errorCheck, discount } = checkDiscountReducer;

    useEffect(() => {
        if (successCheck) {
            toast.success('Mã này chính xác', Toastobjects);
        }
        if (errorCheck) {
            toast.error(errorCheck, Toastobjects);
            dispatch({ type: CHECK_DISCOUNT_RESET });
        }
    }, [dispatch, successCheck, errorCheck]);

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const currenCartItems = cartItems
        .filter((item) => {
            const findCart = item?.product?.optionColor?.find((option) => option.color === item.color);
            if (findCart?.countInStock >= item?.qty && item?.isBuy === true) {
                return true;
            }
        })
        .reduce((arr, pro) => {
            arr.push({
                name: pro.product.name,
                color: pro.color,
                qty: pro.qty,
                image: pro.image,
                price: (pro.product?.price * (100 - pro.product?.discount)) / 100,
                product: pro.product._id,
            });
            return arr;
        }, []);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Calculate Price
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(0);
    };

    cart.itemsPrice = addDecimals(
        cart.cartItems
            .filter((item) => {
                const findCart = item?.product?.optionColor?.find((option) => option.color === item.color);
                if (findCart?.countInStock >= item?.qty && item?.isBuy === true) {
                    return true;
                }
            })
            .reduce((a, i) => a + i.qty * ((i.product?.price * (100 - i.product?.discount)) / 100), 0)
            .toFixed(0),
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 0 ? (cart.itemsPrice > 100 ? 30000 : 20) : 0);
    cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(0)));
    cart.discountPrice = discount ? discount?.priceDiscount : 0;
    cart.totalPrice =
        cart?.cartItems.length > 0
            ? (
                  Number(cart.itemsPrice) +
                  Number(cart.shippingPrice) +
                  Number(cart.taxPrice) -
                  (discount ? discount?.priceDiscount : 0)
              ).toFixed(0)
            : 0;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;
    useEffect(() => {
        if (error) {
            toast.error(error, Toastobjects);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [error]);
    useEffect(() => {
        dispatch(listCart());
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
            dispatch(clearFromCart(userInfo._id));
        }
    }, [history, dispatch, success, order, userInfo]);

    const placeOrderHandler = () => {
        //if (window.confirm("Are you sure"))
        dispatch(
            createOrder({
                orderItems: currenCartItems,
                shippingAddress: {
                    address: userInfo.address,
                    city: userInfo.city,
                    postalCode: '',
                    country: userInfo.country,
                },
                // paymentMethod: cart.paymentMethod,
                paymentMethod: 'Thanh toán bằng tiền mặt',
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                discountPrice: cart.discountPrice,
                totalPrice: cart.totalPrice,
                phone: userInfo.phone,
                name: userInfo.name,
                email: userInfo.email,
            }),
        );
        dispatch({ type: CHECK_DISCOUNT_RESET });
    };

    function findCartCountInStock(item) {
        const findCart = item?.product?.optionColor?.find((option) => option.color === item.color);
        return (
            <>
                {findCart?.countInStock < item?.qty && (
                    <div className="col-md-1 col-2">
                        <span className="span" style={{ fontSize: '12px', color: 'red' }}>
                            Sản phẩm không đủ đáp ứng bạn cần điều chỉnh lại số lượng
                        </span>
                    </div>
                )}
                {findCart?.countInStock < item?.qty ? (
                    <div className="col-md-2 col-5">
                        <img src={`/productImage/${item?.image}`} alt={item.name} />
                    </div>
                ) : (
                    <div className="col-md-2 col-6">
                        <img src={`/productImage/${item?.image}`} alt={item.name} />
                    </div>
                )}
                {findCart?.countInStock < item?.qty ? (
                    <div className="col-md-3 col-5 d-flex align-items-center">
                        <Link to={`/products/${item.product}`}>
                            <h6>{item.product.name}</h6>
                        </Link>
                    </div>
                ) : (
                    <div className="col-md-4 col-6 d-flex align-items-center">
                        <Link to={`/products/${item.product}`}>
                            <h6>{item.product.name}</h6>
                        </Link>
                    </div>
                )}
                <div className="mt-3 mt-md-0 col-md-2 col-4  d-flex align-items-center flex-column justify-content-center ">
                    <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Phân loại hàng</h4>
                    <h6>{item?.color}</h6>
                </div>
                <div className="mt-3 mt-md-0 col-md-2 col-4  d-flex align-items-center flex-column justify-content-center ">
                    <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Số lượng</h4>
                    <h6>{item?.qty}</h6>
                </div>
                <div className="mt-3 mt-md-0 col-md-2 col-4 align-items-end  d-flex flex-column justify-content-center ">
                    <h4 style={{ fontWeight: '600', fontSize: '16px' }}>Giá</h4>
                    <h6>
                        {(item?.qty * ((item?.product?.price * (100 - item?.product?.discount)) / 100))?.toLocaleString(
                            'de-DE',
                        )}
                        đ
                    </h6>
                </div>
            </>
        );
    }
    const handleCheck = () => {
        if (nameDiscount) {
            dispatch(checkDiscountAction({ nameDiscount: nameDiscount.toUpperCase() }));
        }
    };
    return (
        <>
            <Header />
            {loadingCheck && <Loading />}
            {error && <Loading />}
            <Toast />
            <div className="container">
                <PayModal
                    Title="Mua hàng"
                    Body="Bạn có đồng ý mua hay không?"
                    HandleSubmit={placeOrderHandler}
                    Close="modal"
                ></PayModal>
                <div
                    className="row  order-detail"
                    style={{ border: '1px solid rgb(218, 216, 216)', borderRadius: '4px' }}
                >
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div className="row " style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom d-flex justify-content-end">
                                <div className="alert-success order-box fix-none">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                            <div className="col-lg-9 col-sm-9 mb-lg-9 fix-display">
                                <p>
                                    <span style={{ fontWeight: '600' }}>Họ tên: </span>
                                    {userInfo.name}
                                </p>
                                <p>
                                    <span style={{ fontWeight: '600' }}>Số điện thoại: </span>
                                    {userInfo.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div
                            className="row"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
                        >
                            <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom d-flex justify-content-end">
                                <div className="alert-success order-box fix-none">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                            </div>
                            <div className="col-lg-9 col-sm-9 mb-lg-9">
                                <p>
                                    <span style={{ fontWeight: '600' }}>Địa chỉ:</span>{' '}
                                    {`${userInfo?.city}, ${userInfo?.address}, ${userInfo?.country}`}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-lg-3 col-sm-3 mb-lg-3 center fix-bottom d-flex justify-content-end">
                                <div className="alert-success order-box fix-none">
                                    <i class="fab fa-paypal"></i>
                                </div>
                            </div>
                            <div className="col-lg-9 col-sm-9 mb-lg-9">
                                <p>
                                    <p>
                                        <span style={{ fontWeight: '600' }}>Phương thức:</span>{' '}
                                        {'Thanh toán bằng tiền mặt'}
                                    </p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row order-products justify-content-between">
                    <div className="col-lg-12 fix-padding cart-scroll">
                        {cart.cartItems.length === 0 ? (
                            <Message variant="alert-info mt-5">Không có sản phẩm nào được chọn</Message>
                        ) : (
                            <>
                                {cart.cartItems
                                    .filter((item) => item.isBuy == true)
                                    .map((item, index) => (
                                        <div
                                            className="order-product row"
                                            key={index}
                                            style={{ border: '1px solid rgb(218, 216, 216)', borderRadius: '4px' }}
                                        >
                                            {findCartCountInStock(item)}
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="row" style={{ padding: '10px 0', backgroundColor: '#fff', marginTop: '10px' }}>
                    {/* total */}
                    <div
                        className="col-lg-9 d-flex align-items-end flex-column subtotal-order"
                        style={{ border: '1px solid rgb(218, 216, 216)', borderRadius: '4px' }}
                    >
                        <table className="table fix-bottom">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Sản phẩm:</strong>
                                    </td>
                                    <td>{Number(cart?.itemsPrice)?.toLocaleString('de-DE')}đ</td>
                                    <td>
                                        <strong>Thuế:</strong>
                                    </td>
                                    <td>{Number(cart?.taxPrice)?.toLocaleString('de-DE')}đ</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Phí vận chuyển:</strong>
                                    </td>
                                    <td>{Number(cart?.shippingPrice)?.toLocaleString('de-DE')}đ</td>

                                    <td>
                                        <strong>Mã giảm giá:</strong>
                                    </td>
                                    <td>-{cart?.discountPrice?.toLocaleString('de-DE')}đ</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong></strong>
                                    </td>
                                    <td></td>
                                    <td>
                                        <strong>Tổng tiền:</strong>
                                    </td>
                                    <td>{Number(cart?.totalPrice)?.toLocaleString('de-DE')}đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="col-lg-3 d-flex flex-column flex-top-order"
                        style={{ border: '1px solid rgb(218, 216, 216)', borderRadius: '4px' }}
                    >
                        {checkBoolean ? (
                            <div>
                                <label style={{ fontSize: '18px', fontWeight: '600', padding: '5px' }}>
                                    Mã giảm giá:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nameDiscount}
                                    onChange={(e) => setNameDiscount(e.target.value)}
                                    style={{ textTransform: 'uppercase' }}
                                ></input>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleCheck}
                                    style={{ width: '100%', margin: '5px 0' }}
                                >
                                    Kiểm tra
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex align-self-center" style={{ margin: '38px 0' }}>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setCheckBoolean(true)}
                                    style={{ width: '100%', margin: '5px 0' }}
                                >
                                    Nhập mã giảm giá
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className="row"
                    style={{ padding: '10px 0', backgroundColor: '#fff', marginTop: '10px', marginBottom: '30px' }}
                >
                    <div className="col-lg-12 fix-right">
                        <div style={{ fontWeight: '600', paddingRight: '10px' }}>
                            Tổng tiền: {Number(cart.totalPrice)?.toLocaleString('de-DE')}đ
                        </div>
                        {cart.cartItems.length === 0 ? null : (
                            <button
                                type="submit"
                                //onClick={placeOrderHandler}
                                // type="button"
                                class="btn btn-primary pay-button"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                style={{ backgroundColor: '#00483d', borderColor: '#00483d' }}
                            >
                                Đặt hàng
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderScreen;
