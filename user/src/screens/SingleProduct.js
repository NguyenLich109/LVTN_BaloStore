import React, { useEffect, useState } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import Rating from '../components/homeComponents/Rating';
import { Link } from 'react-router-dom';
import Message from './../components/LoadingError/Error';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProductReview,
    listProductDetails,
    createProductComment,
    createProductCommentChild,
    getAllReviews,
    getAllComments,
} from '../Redux/Actions/ProductActions';
import Loading from '../components/LoadingError/Loading';
import {
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_COMMENTCHILD_RESET,
    PRODUCT_CREATE_COMMENT_RESET,
} from '../Redux/Constants/ProductConstants';
import { CART_CREATE_RESET } from '../Redux/Constants/CartConstants';
import moment from 'moment';
import { addToCart, listCart } from '../Redux/Actions/cartActions';
import { listProduct } from '../Redux/Actions/ProductActions';
import { listUser } from '../Redux/Actions/userActions';
import OfferProduct from '../components/SlideCorousel/offerProduct';
import './style/SingleProduct.css';
import DetailProduct from '../components/SlideCorousel/DetailProduct';
import { toast } from 'react-toastify';
import Toast from '../components/LoadingError/Toast';

const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const SingleProduct = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [category, setCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    const [pageNumber, setPageNumber] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortProducts, setSortProducts] = useState('3');
    const [bulean, setBulean] = useState(false);
    const [question, setQuestion] = useState('');
    const [questionChild, setQuestionChild] = useState('');
    const [idComment, setIdComment] = useState('');
    const [buleanReview, setBuleanReview] = useState('');
    const [imageProduct, setImageProduct] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [optionIndex, setOptionIndex] = useState(0);
    const [optionsArrColor, setOptionArrColor] = useState('');
    const [color, setColor] = useState('');
    const [image, setImage] = useState('');
    const [reviewColor, setReviewColor] = useState('');
    const [numberIndexColor, setNumberIndexColor] = useState(0);
    const productId = match.params.id;
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const optionColor = product?.optionColor?.sort(({ color: b }, { color: a }) => (a > b ? 1 : a < b ? -1 : 0));
    const listAllReviews = useSelector((state) => state.getAllReviewsProduct);
    const { reviews } = listAllReviews;
    const listAllComments = useSelector((state) => state.getAllCommentsProduct);
    const { comments } = listAllComments;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const productCommentCreate = useSelector((state) => state.productCommentCreate); //comment
    const productCommentChildCreate = useSelector((state) => state.productCommentChildCreate); //comment child
    const productList = useSelector((state) => state.productList);
    const { products, page, pages } = productList;
    const userList = useSelector((state) => state.userAll);
    const { users } = userList;
    const cartCreate = useSelector((state) => state.cartCreate);
    const { success: successAddCart, loading: loadingAddCart, error: errorAddCart } = cartCreate;
    // const commentsSort = product?.comments?.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
    // const reviewsSort = product.reviews?.sort(({ createdAt: b }, { createdAt: a }) => (a > b ? 1 : a < b ? -1 : 0));
    const {
        loading: loadingCreateReview,
        error: errorCreateReview,
        success: successCreateReview,
    } = productReviewCreate;
    //comment
    const {
        loading: loadingCreateComment,
        error: errorCreateComment,
        success: successCreateComment,
    } = productCommentCreate;
    //comment child
    const {
        loading: loadingCreateCommentChild,
        error: errorCreateCommentChild,
        success: successCreateCommentChild,
    } = productCommentChildCreate;

    useEffect(() => {
        if (optionColor) {
            setColor(optionColor[0]?.color);
            setImage(optionColor[0]?.image);
        }
    }, [optionColor]);

    useEffect(() => {
        setOptionArrColor(() => {
            if (optionColor !== undefined && optionIndex !== undefined) {
                let x = optionColor[optionIndex];
                return x;
            }
        });
    }, [optionIndex, optionColor]);

    useEffect(() => {
        dispatch(getAllReviews(productId));
    }, [productId, successCreateReview]);

    useEffect(() => {
        dispatch(getAllComments(productId));
    }, [productId, successCreateComment, successCreateCommentChild]);

    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listProductDetails(productId));
    }, [dispatch]);

    useEffect(() => {
        dispatch(listProductDetails(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (successCreateComment) {
            dispatch({ type: PRODUCT_CREATE_COMMENT_RESET });
        }
        if (successCreateCommentChild) {
            dispatch({ type: PRODUCT_CREATE_COMMENTCHILD_RESET });
        }
    }, [successCreateComment, successCreateCommentChild]);

    useEffect(() => {
        if (bulean) {
            setBulean(false);
            setRating(0);
            setComment('');
            setReviewColor('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
    }, [bulean]);
    useEffect(() => {
        if (product._id !== undefined) {
            setCategory(product.category);
            setMinPrice(Math.floor(product.price / 2));
            setMaxPrice(Math.round(product.price * 2));
        }
    }, [product._id]);
    useEffect(() => {
        if (product !== undefined && maxPrice) {
            dispatch(listProduct(category, keyword, pageNumber, rating, minPrice, maxPrice, sortProducts));
        }
    }, [category, maxPrice]);

    const arrStar = [5, 4, 3, 2, 1];
    const reviewCart = reviews;
    const returnStar = arrStar.map((star) => {
        let review = reviewCart?.filter((rev) => {
            return star === rev.rating;
        });
        star = {
            rating: star,
            numReview: review.length,
            percentage: (review.length / (reviewCart.length === 0 ? 1 : reviewCart.length)) * 100,
        };
        return star;
    });
    const [mediumReview, setMediumReview] = useState();
    useEffect(() => {
        const medium = returnStar.reduce((total, num) => {
            return total + num.rating * num.numReview;
        }, 0);
        const sumReview = returnStar.reduce((total, num) => {
            return total + num.numReview;
        }, 0);
        let retult = ((medium / (5 * (sumReview === 0 ? 1 : sumReview))) * 5).toFixed(1);
        setMediumReview(retult);
    }, [reviewCart]);

    useEffect(() => {
        if (successAddCart) {
            dispatch({ type: CART_CREATE_RESET });
            dispatch(listCart());
        }
        if (errorAddCart) {
            toast.error(errorAddCart, Toastobjects);
            dispatch({ type: CART_CREATE_RESET });
        }
    }, [dispatch, successAddCart, errorAddCart]);

    const AddToCartHandle = (e) => {
        e.preventDefault();
        if (userInfo) {
            dispatch(addToCart(productId, color, qty, image, userInfo._id));
        } else history.push('/login');
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(productId, rating, reviewColor, comment));
    };

    const buyCart = () => {
        if (userInfo) {
            dispatch(addToCart(productId, color, qty, image, userInfo._id));
            history.push(`/cart/${productId}?qty=${qty}?color=${color}`);
        } else history.push('/login');
    };

    //comment
    const submitComment = (e) => {
        e.preventDefault();
        dispatch(createProductComment(productId, { nameProduct, imageProduct, question }));
        setQuestion('');
    };

    // quenstion child
    const submitQuestionChild = (e) => {
        e.preventDefault();
        dispatch(createProductCommentChild(productId, { questionChild, idComment }));
        setQuestionChild('');
    };
    function findProductUser(data) {
        const findUser = users?.find((user) => user._id === data.user);
        return (
            <img
                src={findUser?.image ? `${findUser?.image}` : '/images/user.png'} // upload ???nh
                alt=""
                style={{
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                    marginRight: '5px',
                    objectFit: 'cover',
                }}
                className="fix-none"
            />
        );
    }
    return (
        <>
            <Header />
            <div className="container single-product">
                <Toast />
                {loadingAddCart && <Loading />}
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-md-12 product-avatar">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="single-image">
                                            <DetailProduct
                                                products={product?.optionColor}
                                                indexNumber={numberIndexColor}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-7 ">
                                        <div className="product-dtl">
                                            <div className="product-info">
                                                <div className="product-name">{product.name}</div>
                                            </div>
                                            {/* <p>{product.description}</p> */}

                                            <div className="product-baner">
                                                <img
                                                    style={{ width: '100%' }}
                                                    src="http://balo.giaodienwebmau.com/wp-content/uploads/2021/06/ant_index_bottom_banner_big_2.jpg"
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="product-count col-lg-12 ">
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>Gi??</h6>
                                                    <div className="d-flex justify-content-center">
                                                        {product?.discount !== 0 && (
                                                            <p className="corousel-price text-none">
                                                                {product?.price?.toLocaleString('de-DE')}??
                                                            </p>
                                                        )}
                                                        <p
                                                            className="corousel-price"
                                                            style={{ color: 'black', fontSize: '18px' }}
                                                        >
                                                            {(
                                                                (product?.price * (100 - product?.discount)) /
                                                                100
                                                            ).toLocaleString('de-DE')}
                                                            ??
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>Tr???ng th??i</h6>
                                                    {optionsArrColor?.countInStock > 0 ? (
                                                        <span>C??n h??ng</span>
                                                    ) : (
                                                        <span>H???t h??ng</span>
                                                    )}
                                                </div>
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>????nh gi??</h6>
                                                    <Rating
                                                        value={product.rating}
                                                        text={`${product.numReviews} ????nh gi??`}
                                                    />
                                                </div>
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>M??u s???c</h6>
                                                    <div>
                                                        {optionColor?.map((option, index) => (
                                                            <button
                                                                type="button"
                                                                key={option._id}
                                                                onClick={() => {
                                                                    setOptionIndex(index);
                                                                    setColor(option.color);
                                                                    setImage(option.image);
                                                                    setNumberIndexColor(index);
                                                                }}
                                                                class={
                                                                    optionIndex === index
                                                                        ? 'btn btn-outline-primary mx-1 active'
                                                                        : 'btn btn-outline-primary mx-1'
                                                                }
                                                                style={{ marginTop: '8px' }}
                                                            >
                                                                {option.color}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                {optionsArrColor?.countInStock > 0 ? (
                                                    <>
                                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                                            <h6>S??? l?????ng</h6>
                                                            <select
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {[...Array(optionsArrColor.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ),
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className="btn-add-product d-flex">
                                                            <button
                                                                onClick={AddToCartHandle}
                                                                className="round-black-btn"
                                                            >
                                                                <i class="fas fa-cart-plus"></i>
                                                                Th??m v??o gi??? h??ng
                                                            </button>
                                                            <button onClick={buyCart} className="round-black-btn">
                                                                MUA NGAY
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-description">
                                        <h2 className="product-description__h2">Chi Ti???t S???n Ph???m</h2>
                                        {/* <p>{product.description}</p> */}
                                        <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                                    </div>
                                </div>
                            </div>
                            {/* RATING */}
                            <div
                                style={{
                                    borderRadius: '10px',
                                    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
                                    paddingTop: '10px',
                                }}
                            >
                                <div className="col-md-12 col-sm-12">
                                    <h2 className="noti-view">????nh gi?? & nh???n x??t</h2>
                                    <div style={{ border: '2px solid #ccc', borderRadius: '10px' }}>
                                        <div className="row">
                                            <div className="col-md-4 col-sm-5 text-center pt-4">
                                                <div class="rating-box">
                                                    <h1 class="pt-4">{mediumReview}</h1>
                                                    <p class="">out of 5</p>
                                                </div>
                                                <div className="reviewMedium">
                                                    <Rating value={mediumReview} />
                                                </div>
                                                <p class="">{reviewCart.length} ????nh gi?? v?? nh???n x??t</p>
                                            </div>
                                            <div class="col-md-8 col-sm-7">
                                                <div class="rating-bar0 justify-content-center">
                                                    <table class="text-left mx-auto">
                                                        {returnStar.map((star) => {
                                                            return (
                                                                <tr>
                                                                    <td class="rating-label">
                                                                        {star.rating}
                                                                        <span class="fa fa-star star-active mx-1"></span>
                                                                    </td>
                                                                    <td class="rating-bar">
                                                                        <div class="bar-container">
                                                                            <div
                                                                                class="bar-5"
                                                                                style={{
                                                                                    width: `${star.percentage}%`,
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="text-right">
                                                                        {star.numReview} ????nh gi??
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttonReview" style={{ textAlign: 'center', marginTop: '10px' }}>
                                        <p>B???n ????nh gi?? sao s???n ph???m n??y</p>
                                        <Link to="/byproduct" className="text-white">
                                            <button
                                            // type="submit"
                                            // class="btn btn-primary pay-button"
                                            // data-bs-toggle="modal"
                                            // data-bs-target="#staticBackdrop"
                                            >
                                                ????nh gi?? ngay
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-12 product-rating">
                                    <div
                                        class="modal fade"
                                        id="staticBackdrop"
                                        data-bs-backdrop="static"
                                        data-bs-keyboard="false"
                                        tabindex="-1"
                                        aria-labelledby="staticBackdropLabel"
                                        aria-hidden="true"
                                    >
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header" style={{ padding: '0.5rem 1rem' }}>
                                                    <button
                                                        type="button"
                                                        class="btn-close"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                        onClick={() => {
                                                            setBulean(true);
                                                        }}
                                                    ></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div>
                                                        <h6
                                                            className="write-review text-center"
                                                            style={{ fontSize: '20px' }}
                                                        >
                                                            ????nh gi?? s???n ph???m
                                                        </h6>
                                                        <div className="my-4">
                                                            {errorCreateReview && (
                                                                <Message variant="alert-danger">
                                                                    {errorCreateReview}
                                                                </Message>
                                                            )}
                                                            {successCreateReview && (
                                                                <Message class="alert alert-primary">
                                                                    C???m ??n b???n ???? ????nh gi??
                                                                </Message>
                                                            )}
                                                        </div>
                                                        {userInfo ? (
                                                            <form onSubmit={submitHandler}>
                                                                <div className="my-4">
                                                                    <strong>????nh gi??</strong>
                                                                    <select
                                                                        value={rating}
                                                                        onChange={(e) => setRating(e.target.value)}
                                                                        className="col-12 p-3 mt-2 border-0 rounded"
                                                                        style={{ backgroundColor: '#e9eaed80' }}
                                                                    >
                                                                        <option value="">L???a ch???n...</option>
                                                                        <option value="1">1 - R???t t???</option>
                                                                        <option value="2">2 - T???</option>
                                                                        <option value="3">3 - B??nh th?????ng</option>
                                                                        <option value="4">4 - T???t</option>
                                                                        <option value="5">5 - R???t t???t</option>
                                                                    </select>
                                                                </div>
                                                                <div className="my-4">
                                                                    <strong>M??u s???c</strong>
                                                                    <select
                                                                        value={reviewColor}
                                                                        onChange={(e) => setReviewColor(e.target.value)}
                                                                        className="col-12 p-3 mt-2 border-0 rounded"
                                                                        style={{ backgroundColor: '#e9eaed80' }}
                                                                    >
                                                                        <option value="">L???a ch???n...</option>
                                                                        {optionColor?.map((option) => {
                                                                            return (
                                                                                <option
                                                                                    key={option._id}
                                                                                    value={option.color}
                                                                                >
                                                                                    {option.color}
                                                                                </option>
                                                                            );
                                                                        })}
                                                                    </select>
                                                                </div>
                                                                <div className="my-4">
                                                                    <strong>B??nh lu???n</strong>
                                                                    <textarea
                                                                        row="3"
                                                                        value={comment}
                                                                        onChange={(e) => setComment(e.target.value)}
                                                                        className="col-12 p-3 mt-2 border-0 rounded"
                                                                        style={{ backgroundColor: '#e9eaed80' }}
                                                                    ></textarea>
                                                                </div>
                                                                <div className="my-3">
                                                                    <button
                                                                        disabled={loadingCreateReview}
                                                                        className="col-12 bg-orange border-0 p-3 rounded text-white"
                                                                        type="submit"
                                                                    >
                                                                        <p>G???i ????nh gi??</p>
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        ) : (
                                                            <div className="my-3">
                                                                <Message variant={'alert-warning'}>
                                                                    L??m ??n{' '}
                                                                    <Link to="/login">
                                                                        "{' '}
                                                                        <strong data-bs-dismiss="modal">
                                                                            ????ng nh???p
                                                                        </strong>{' '}
                                                                        "
                                                                    </Link>{' '}
                                                                    v?? mua s???n ph???m ????? ????nh gi??{' '}
                                                                </Message>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 product-rating" style={{ paddingTop: '20px' }}>
                                    <div className="rating-review">
                                        {reviews?.map((review) => (
                                            <div
                                                key={review._id}
                                                className="mb-2 mb-md-3 bg-light p-3 shadow-sm rounded-5"
                                                style={{ borderRadius: '10px' }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div className="rating-review__flex">
                                                        <img
                                                            src={
                                                                review?.user?.image
                                                                    ? `/userProfile/${review?.user?.image}`
                                                                    : '/images/user.png'
                                                            } // upload ???nh
                                                            alt=""
                                                            style={{
                                                                height: '40px',
                                                                width: '40px',
                                                                borderRadius: '50%',
                                                                marginRight: '5px',
                                                                objectFit: 'cover',
                                                            }}
                                                            className="fix-none"
                                                        />
                                                        <div className="review-rating">
                                                            <strong>{review.name}</strong>
                                                        </div>
                                                    </div>
                                                    <div style={{ paddingLeft: '10px' }}>
                                                        <span>
                                                            {/* {moment(review.createdAt).calendar()} */}
                                                            {moment(review.createdAt).format('DD/MM/YYYY')}{' '}
                                                            {moment(review.createdAt).hours()}
                                                            {':'}
                                                            {moment(review.createdAt).minutes() < 10
                                                                ? `0${moment(review.createdAt).minutes()}`
                                                                : moment(review.createdAt).minutes()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="alert alert-info mt-3">
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span
                                                            style={{
                                                                paddingRight: '5px',
                                                                fontSize: '15px',
                                                                fontWeight: '600',
                                                            }}
                                                        >
                                                            ????nh gi??:{' '}
                                                        </span>
                                                        <Rating value={review.rating} />
                                                    </div>
                                                    <div style={{ fontSize: '16px' }}>
                                                        <span
                                                            style={{
                                                                paddingRight: '5px',
                                                                fontSize: '15px',
                                                                fontWeight: '600',
                                                            }}
                                                        >
                                                            M??u s???c:
                                                        </span>{' '}
                                                        {review.color}
                                                    </div>
                                                    <div style={{ fontSize: '16px' }}>
                                                        <span
                                                            style={{
                                                                paddingRight: '5px',
                                                                fontSize: '15px',
                                                                fontWeight: '600',
                                                            }}
                                                        >
                                                            Nh???n x??t:
                                                        </span>{' '}
                                                        {review.comment}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    borderRadius: '10px',
                                    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 10%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
                                    paddingTop: '10px',
                                    marginTop: '15px',
                                }}
                            >
                                <h2 className="noti-view">Ho??i va?? ??a??p</h2>
                                <form
                                    onSubmit={submitComment}
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                    <textarea
                                        value={question}
                                        className="question-product"
                                        placeholder="Xin m???i ????? l???i c??u h???i, BaloStore s??? tr??? l???i l???i trong 1h, c??c c??u h???i sau 22h - 8h s??? ???????c tr??? l???i v??o s??ng h??m sau"
                                        onChange={(e) => {
                                            setQuestion(e.target.value);
                                            setImageProduct(product?.optionColor[0].image);
                                            setNameProduct(product.name);
                                        }}
                                    ></textarea>
                                    {userInfo ? (
                                        <button className="button">
                                            <i class="fas fa-paper-plane" style={{ paddingRight: '5px' }}></i>
                                            G???i
                                        </button>
                                    ) : (
                                        <div className="my-3 flex-padding">
                                            <Message variant={'alert-warning'}>
                                                <Link to="/login">
                                                    <strong
                                                        data-bs-dismiss="modal"
                                                        style={{ fontSize: '13px', padding: '0px 2px' }}
                                                    >
                                                        ????ng nh???p
                                                    </strong>
                                                </Link>
                                            </Message>
                                        </div>
                                    )}
                                </form>
                                <div className="col-md-12 product-rating">
                                    <div className="rating-review">
                                        {loadingCreateComment && <Loading />}
                                        {errorCreateCommentChild && (
                                            <Message variant="alert-danger">{errorCreateCommentChild}</Message>
                                        )}
                                        {comments?.map((review) => (
                                            <div key={review._id} className="mb-2 mb-md-2 p-3 rounded-5 backgroud">
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <div className="rating-review__flex">
                                                        <img
                                                            src={
                                                                review?.user?.image
                                                                    ? `${review?.user?.image}`
                                                                    : '/images/user.png'
                                                            }
                                                            alt=""
                                                            style={{
                                                                height: '40px',
                                                                width: '40px',
                                                                borderRadius: '50%',
                                                                marginRight: '5px',
                                                                objectFit: 'cover',
                                                            }}
                                                            className="fix-none"
                                                        />
                                                        <div className="review-rating">
                                                            <strong>{review.name}</strong>
                                                        </div>
                                                    </div>
                                                    <div style={{ paddingLeft: '10px' }}>
                                                        <span>
                                                            {/* {moment(review.createdAt).calendar()} */}
                                                            {moment(review.createdAt).format('DD/MM/YYYY')}{' '}
                                                            {moment(review.createdAt).hours()}
                                                            {':'}
                                                            {moment(review.createdAt).minutes() < 10
                                                                ? `0${moment(review.createdAt).minutes()}`
                                                                : moment(review.createdAt).minutes()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="alert mt-3 product-review"
                                                    style={{ display: 'flex', flexDirection: 'column' }}
                                                >
                                                    <span>{review.question}</span>
                                                    <span
                                                        className="commentChild"
                                                        onClick={() => {
                                                            setIdComment(review._id);
                                                            setBuleanReview(review._id);
                                                        }}
                                                    >
                                                        <i
                                                            class="fas fa-comments-alt"
                                                            style={{ paddingRight: '5px' }}
                                                        ></i>
                                                        Tr??? l???i
                                                    </span>
                                                </div>
                                                <div
                                                    className="product-review"
                                                    style={{ padding: '0px', boxShadow: 'none' }}
                                                >
                                                    {review.commentChilds?.map((child) => (
                                                        <div
                                                            key={child._id}
                                                            className="mb-2 mb-md-2 p-3 rounded-5 backgroud marginbottom"
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <div className="rating-review__flex">
                                                                    {findProductUser(child)}
                                                                    <div className="review-rating">
                                                                        <strong>{child.name}</strong>
                                                                    </div>
                                                                </div>
                                                                <div style={{ paddingLeft: '10px' }}>
                                                                    <span>
                                                                        {/* {moment(review.createdAt).calendar()} */}
                                                                        {moment(child.createdAt).format(
                                                                            'DD/MM/YYYY',
                                                                        )}{' '}
                                                                        {moment(child.createdAt).hours()}
                                                                        {':'}
                                                                        {moment(child.createdAt).minutes() < 10
                                                                            ? `0${moment(child.createdAt).minutes()}`
                                                                            : moment(child.createdAt).minutes()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="alert mt-3 product-review">
                                                                <span>{child.questionChild}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {buleanReview === review._id && (
                                                    <form
                                                        onSubmit={submitQuestionChild}
                                                        style={{ display: 'flex', justifyContent: 'space-between' }}
                                                    >
                                                        <textarea
                                                            className="question-product"
                                                            placeholder="Xin m???i ????? l???i c??u h???i, BaloStore s??? tr??? l???i l???i trong 1h, c??c c??u h???i sau 22h - 8h s??? ???????c tr??? l???i v??o s??ng h??m sau"
                                                            value={questionChild}
                                                            onChange={(e) => {
                                                                setQuestionChild(e.target.value);
                                                            }}
                                                        ></textarea>
                                                        {userInfo ? (
                                                            <button className="button">
                                                                <i
                                                                    class="fas fa-paper-plane"
                                                                    style={{ paddingRight: '5px' }}
                                                                ></i>
                                                                G???i
                                                            </button>
                                                        ) : (
                                                            <div className="my-3 flex-padding">
                                                                <Message variant={'alert-warning'}>
                                                                    <Link to="/login">
                                                                        <strong
                                                                            data-bs-dismiss="modal"
                                                                            style={{
                                                                                fontSize: '13px',
                                                                                padding: '0px 2px',
                                                                            }}
                                                                        >
                                                                            ????ng nh???p
                                                                        </strong>
                                                                    </Link>
                                                                </Message>
                                                            </div>
                                                        )}
                                                    </form>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <OfferProduct products={products} />
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SingleProduct;
