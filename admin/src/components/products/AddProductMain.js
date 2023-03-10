import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    PRODUCT_CREATE_RESET,
    PRODUCT_OPTIONCOLOR_RESET,
    PRODUCT_CREATE_IMAGE_RESET,
} from '../../Redux/Constants/ProductConstants';
import { createProduct, createOptionColor, editProduct, createImageProduct } from '../../Redux/Actions/ProductActions';
import Toast from '../LoadingError/Toast';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { ListCategory } from '../../Redux/Actions/categoryActions';
import isEmpty from 'validator/lib/isEmpty';
import { v4 as uuidv4 } from 'uuid';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const AddProductMain = () => {
    let uuId = uuidv4();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    // const [inputImage, setInputImage] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [productId, setProducId] = useState('');
    const [discount, setDiscount] = useState(0);
    const [validate, setValidate] = useState({});
    const { quill, quillRef } = useQuill();
    const [disabledOptionColor, setDisabledOptionColor] = useState(false);
    const [disabledProduct, setDisabledProduct] = useState(true);
    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, product } = productCreate;
    const productColor = useSelector((state) => state.optionColorCreate);
    const { error: errorOption, success: successOption } = productColor;
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    const productEdit = useSelector((state) => state.productEdit);
    const { product: productOption } = productEdit;
    const productCreateImage = useSelector((state) => state.productCreateImage);
    const { urlImages, success: successCreactImage } = productCreateImage;
    useEffect(() => {
        if (product) {
            toast.success('Th??m s???n ph???m th??nh c??ng', ToastObjects);
            dispatch({ type: PRODUCT_CREATE_RESET });
            setProducId(product._id);
        }
    }, [product, dispatch]);

    useEffect(() => {
        if (successOption) {
            dispatch({ type: PRODUCT_OPTIONCOLOR_RESET });
            setColor('');
            setCountInStock(1);
            setUrlImage('');
        }
    }, [successOption, dispatch]);

    useEffect(() => {
        dispatch(editProduct(productId));
    }, [productId, successOption, dispatch]);

    useEffect(() => {
        dispatch(ListCategory());
    }, [dispatch]);

    useEffect(() => {
        if (successCreactImage) {
            dispatch({ type: PRODUCT_CREATE_IMAGE_RESET });
        }
    }, [successCreactImage, dispatch, productId, color, countInStock, urlImages]);
    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDescription(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill]);

    const isEmptyCheckEdit = () => {
        const msg = {};
        if (isEmpty(category)) {
            msg.category = 'Vui l??ng nh???p lo???i s???n ph???m';
            msg.borderRed1 = 'border-red';
        }
        if (isEmpty(name)) {
            msg.name = 'Vui l??ng nh???p t??n s???n ph???m';
            msg.borderRed2 = 'border-red';
        }
        if (isEmpty(price)) {
            msg.price = 'Vui l??ng nh???p gi?? s???n ph???m';
            msg.borderRed3 = 'border-red';
        } else {
            if (price < 0) {
                msg.price = 'Vui l??ng nh???p gi?? tr??? d????ng';
                msg.borderRed3 = 'border-red';
            }
        }
        if (isEmpty(description)) {
            msg.description = 'Vui l??ng nh???p m?? t??? s???n ph???m';
            msg.borderRed6 = 'border-red';
        }
        setValidate(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const isEmptyValidate = isEmptyCheckEdit();
        if (!isEmptyValidate) return;
        if (category !== -1) {
            dispatch(createProduct(name, price, description, category, discount));
            setDisabledProduct(false);
            setDisabledOptionColor(true);
        }
    };
    const submitOptionHandler = (e) => {
        e.preventDefault();
        if (color && countInStock && urlImage) {
            dispatch(createOptionColor(productId, { color, countInStock, image: urlImage }));
        }
    };

    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: '1200px' }}>
                <form>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Tr??? v??? Trang s???n ph???m
                        </Link>
                        <h2 className="content-title">Th??m s???n ph???m</h2>
                        <div>
                            {/* <button type="submit" className="btn btn-primary color-orange">
                                Add Product
                            </button> */}
                        </div>
                    </div>

                    <div className="row mb-0">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-0">
                                <div className="card-body shadow-sm">
                                    <div className="card-body shadow-sm" style={{ border: '1px solid #ccc' }}>
                                        {error && <Message variant="alert-danger">{error}</Message>}
                                        {loading && <Loading />}
                                        <from>
                                            <div className="mb-0">
                                                <label htmlFor="product_title" className="form-label">
                                                    T??n s???n ph???m
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="T??n s???n ph???m"
                                                    className={`form-control ${validate.borderRed2}`}
                                                    id="product_title"
                                                    //required
                                                    value={name}
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed2 = '';
                                                            x.name = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                                <p className="product_validate">{validate.name}</p>
                                            </div>
                                            <div className="mb-0">
                                                <label htmlFor="product_price" className="form-label">
                                                    Gi??
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Gi?? s???n ph???m"
                                                    className={`form-control ${validate.borderRed3}`}
                                                    id="product_price"
                                                    //required
                                                    value={price}
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed3 = '';
                                                            x.price = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                                <p className="product_validate">{validate.price}</p>
                                            </div>

                                            <div className="mb-0">
                                                <label htmlFor="product_price" className="form-label">
                                                    Gi???m gi??
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Gi?? s???n ph???m"
                                                    className={`form-control ${validate.borderRed4}`}
                                                    id="product_price"
                                                    //required
                                                    value={discount}
                                                    min="0"
                                                    max="100"
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed4 = '';
                                                            x.discount = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setDiscount(e.target.value)}
                                                />
                                                <p className="product_validate">{validate.discount}</p>
                                            </div>

                                            <div className="mb-0">
                                                <label htmlFor="product_category" className="form-label">
                                                    Danh m???c
                                                </label>
                                                <select
                                                    type="text"
                                                    id="product_category"
                                                    //className="form-select"
                                                    className={`form-select ${validate.borderRed1}`}
                                                    aria-label=".form-select-lg example"
                                                    //required
                                                    value={category}
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed1 = '';
                                                            x.category = '';
                                                            return x;
                                                        });
                                                    }}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    title="Please select category"
                                                    placeholder="Vui l??ng ch???n th??? lo???i h??ng"
                                                >
                                                    <option value={-1} selected>
                                                        Ch???n
                                                    </option>
                                                    {categories.map((cate, index) => (
                                                        <option key={index} value={cate._id}>
                                                            {cate.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <p className="product_validate">{validate.category}</p>
                                            </div>
                                            <div className="mb-0">
                                                <label className="form-label">N???i dung</label>
                                                <div
                                                    onClick={() => {
                                                        setValidate((values) => {
                                                            const x = { ...values };
                                                            x.borderRed6 = '';
                                                            x.description = '';
                                                            return x;
                                                        });
                                                    }}
                                                    style={{ width: '100%' }}
                                                >
                                                    <div ref={quillRef} />
                                                </div>
                                                <p className="product_validate">{validate.description}</p>
                                            </div>
                                            <div
                                                style={{ marginTop: '10px', display: 'flex', justifyContent: 'right' }}
                                            >
                                                {disabledProduct && (
                                                    <button
                                                        className="btn btn-primary color-orange"
                                                        onClick={submitHandler}
                                                    >
                                                        L??u
                                                    </button>
                                                )}
                                            </div>
                                        </from>
                                    </div>
                                    <div
                                        className="card-body shadow-sm"
                                        style={{ marginTop: '10px', border: '1px solid #ccc' }}
                                    >
                                        <div className="row">
                                            <div className="col-md-4 col-lg-4">
                                                {errorOption && (
                                                    <Message variant="alert-danger">
                                                        M??u b??? tr??ng ho???c s??? l?????ng ch??a ????ng vui l??ng nh???p l???i
                                                    </Message>
                                                )}
                                                {/* {loadingOption && <Loading />} */}
                                                <form>
                                                    <div className="mb-0">
                                                        <label htmlFor="product_price" className="form-label">
                                                            M??u s???c
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Color"
                                                            className={`form-control ${validate.borderRed5}`}
                                                            id="product_price"
                                                            //required
                                                            value={color}
                                                            onClick={() => {
                                                                setValidate((values) => {
                                                                    const x = { ...values };
                                                                    x.borderRed5 = '';
                                                                    x.countInStock = '';
                                                                    return x;
                                                                });
                                                            }}
                                                            onChange={(e) => setColor(e.target.value)}
                                                        />
                                                        <p className="product_validate">{validate.countInStock}</p>
                                                    </div>

                                                    <div className="mb-0">
                                                        <label htmlFor="product_price" className="form-label">
                                                            S??? l?????ng
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="Number"
                                                            className={`form-control ${validate.borderRed5}`}
                                                            id="product_price"
                                                            //required
                                                            value={countInStock}
                                                            onClick={() => {
                                                                setValidate((values) => {
                                                                    const x = { ...values };
                                                                    x.borderRed5 = '';
                                                                    x.countInStock = '';
                                                                    return x;
                                                                });
                                                            }}
                                                            onChange={(e) => setCountInStock(e.target.value)}
                                                        />
                                                        <p className="product_validate">{validate.countInStock}</p>
                                                    </div>

                                                    <div className="mb-0">
                                                        <label htmlFor="product_price" className="form-label">
                                                            H??nh ???nh
                                                        </label>
                                                        <input
                                                            className="form-control col-12 col-sm-12 col-md-12 col-lg-12"
                                                            onChange={(e) => setUrlImage(e.target.value)}
                                                            value={urlImage}
                                                            type="text"
                                                            placeholder="Url"
                                                        />
                                                    </div>

                                                    <div className="d-grid" style={{ marginTop: '10px' }}>
                                                        {disabledOptionColor && (
                                                            <button
                                                                onClick={submitOptionHandler}
                                                                className="btn btn-primary py-2 color-orange"
                                                            >
                                                                L??u
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-8 col-lg-8">
                                                <table className="table slider-data">
                                                    <thead>
                                                        <tr>
                                                            <th>Stt</th>
                                                            <th>M??u s???c</th>
                                                            <th>S??? l?????ng</th>
                                                            <th>H??nh ???nh</th>
                                                        </tr>
                                                    </thead>
                                                    {/* Table Data */}
                                                    <tbody>
                                                        {productOption?.optionColor &&
                                                            productOption?.optionColor?.map((option, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        <b>{option.color}</b>
                                                                    </td>
                                                                    <td>
                                                                        <span>{option.countInStock}</span>
                                                                    </td>
                                                                    <td>
                                                                        <img
                                                                            style={{
                                                                                height: '40px',
                                                                                width: '40px',
                                                                            }}
                                                                            src={option?.image}
                                                                            alt="Product"
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddProductMain;
