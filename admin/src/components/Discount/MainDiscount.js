import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createDiscountAction,
    getDiscountAction,
    updateDiscountAction,
    deleteDiscountAction,
    verifiDiscountAction,
} from '../../Redux/Actions/DiscountActions';
import {
    CREATE_DISCOUNT_RESET,
    UPDATE_DISCOUNT_RESET,
    DELETE_DISCOUNT_RESET,
    VERIFI_DISCOUNT_RESET,
} from '../../Redux/Constants/DiscountContainer';
import Loading from '../LoadingError/Loading';
import { toast } from 'react-toastify';
import Toast from '../LoadingError/Toast';
// import Message from '../LoadingError/Error';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const MainDiscount = () => {
    const dispatch = useDispatch();
    const [nameDiscount, setNameDiscount] = useState('');
    const [timeDiscount, setTimeDiscount] = useState('');
    const [priceDiscount, setPriceDiscount] = useState(50000);
    const [dateDiscount, setDateDiscount] = useState('');
    const [senconTime, setSenconTime] = useState('');
    const [countInStock, setCountInStock] = useState(1);
    const [idDiscount, setIddiscount] = useState('');

    const createDiscountReduce = useSelector((state) => state.createDiscountReduce);
    const { loading: loadingCreate, success: successCreate, error: errorCreate } = createDiscountReduce;

    const getDiscountReduce = useSelector((state) => state.getDiscountReduce);
    const { loading: loadingGet, discount } = getDiscountReduce;

    const deleteDiscountReduce = useSelector((state) => state.deleteDiscountReduce);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = deleteDiscountReduce;

    const updateDiscountReduce = useSelector((state) => state.updateDiscountReduce);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = updateDiscountReduce;

    const verifiDiscountReduce = useSelector((state) => state.verifiDiscountReduce);
    const { loading: loadingVerifi, success: successVerifi, error: errorVerifi } = verifiDiscountReduce;

    useEffect(() => {
        dispatch(getDiscountAction());
    }, [dispatch]);

    // create
    useEffect(() => {
        if (successCreate) {
            toast.success('Đã tạo thành công', ToastObjects);
            dispatch({ type: CREATE_DISCOUNT_RESET });
            dispatch(getDiscountAction());
        }
        if (errorCreate) {
            toast.error(errorCreate, ToastObjects);
            dispatch({ type: CREATE_DISCOUNT_RESET });
        }
    }, [dispatch, successCreate, errorCreate]);

    // delete
    useEffect(() => {
        if (successDelete) {
            toast.success('Đã xóa thành công', ToastObjects);
            dispatch({ type: DELETE_DISCOUNT_RESET });
            dispatch(getDiscountAction());
        }
        if (errorDelete) {
            toast.error(errorDelete, ToastObjects);
            dispatch({ type: DELETE_DISCOUNT_RESET });
        }
    }, [dispatch, successDelete, errorDelete]);

    // update
    useEffect(() => {
        if (successUpdate) {
            toast.success('Đã cập nhật thành công', ToastObjects);
            dispatch({ type: UPDATE_DISCOUNT_RESET });
            dispatch(getDiscountAction());
        }
        if (errorUpdate) {
            toast.error(errorUpdate, ToastObjects);
            dispatch({ type: UPDATE_DISCOUNT_RESET });
        }
    }, [dispatch, successUpdate, errorUpdate]);

    useEffect(() => {
        if (successVerifi) {
            toast.success('Đã gửi thành công', ToastObjects);
            dispatch({ type: VERIFI_DISCOUNT_RESET });
        }
        if (errorVerifi) {
            toast.error(errorVerifi, ToastObjects);
            dispatch({ type: VERIFI_DISCOUNT_RESET });
        }
    }, [dispatch, successVerifi, errorVerifi]);

    useEffect(() => {
        if (timeDiscount && dateDiscount) {
            const time = new Date(`${dateDiscount}T${timeDiscount}`).getTime();
            if (time) {
                setSenconTime(time);
            }
        }
    }, [timeDiscount, dateDiscount]);

    useEffect(() => {
        if (idDiscount) {
            const findDiscount = discount?.find((dis) => dis._id === idDiscount);
            if (findDiscount) {
                setNameDiscount(findDiscount.nameDiscount);
                setPriceDiscount(findDiscount.priceDiscount);
                setCountInStock(findDiscount.countInStock);
                setTimeDiscount(findDiscount.date1);
                setDateDiscount(findDiscount.date2);
                setSenconTime(findDiscount.timeDiscount);
            }
        }
    }, [idDiscount, discount]);

    const handleSave = () => {
        if (nameDiscount && senconTime && priceDiscount && countInStock) {
            dispatch(
                createDiscountAction({
                    nameDiscount: nameDiscount.toUpperCase(),
                    priceDiscount,
                    countInStock,
                    timeDiscount: senconTime,
                    date1: timeDiscount,
                    date2: dateDiscount,
                }),
            );
            setNameDiscount('');
            setPriceDiscount(50000);
            setTimeDiscount('');
            setDateDiscount('');
            setSenconTime('');
            setCountInStock(1);
        }
    };

    const handleUpdate = () => {
        if (nameDiscount && senconTime && priceDiscount) {
            dispatch(
                updateDiscountAction({
                    id: idDiscount,
                    nameDiscount: nameDiscount.toUpperCase(),
                    priceDiscount,
                    countInStock,
                    timeDiscount: senconTime,
                    date1: timeDiscount,
                    date2: dateDiscount,
                }),
            );
            setNameDiscount('');
            setPriceDiscount(50000);
            setTimeDiscount('');
            setDateDiscount('');
            setSenconTime('');
            setIddiscount('');
            setCountInStock(1);
        }
    };
    return (
        <>
            <Toast />
            <section className="content-main">
                {(loadingCreate || loadingGet || loadingDelete || loadingUpdate || loadingVerifi) && <Loading />}
                <div className="content-header">
                    <h2 className="content-title">Mã giảm giá</h2>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="row">
                            {/* Create category */}
                            <div className="col-md-4 col-lg-4">
                                <div className="mb-1">
                                    <label htmlFor="product_name" className="form-label">
                                        Tên mã giảm giá:
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        id="product_name"
                                        style={{ textTransform: 'uppercase' }}
                                        value={nameDiscount}
                                        onChange={(e) => setNameDiscount(e.target.value)}
                                    />
                                </div>

                                <div className="mb-1">
                                    <label htmlFor="product_name" className="form-label">
                                        Giá tiền giảm giá:
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        id="product_name"
                                        value={priceDiscount}
                                        onChange={(e) => setPriceDiscount(e.target.value)}
                                    />
                                </div>

                                <div className="mb-1">
                                    <label htmlFor="product_name" className="form-label">
                                        Số lượng:
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        id="product_name"
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    />
                                </div>

                                <label className="form-label">Thời hạn giảm giá:</label>
                                <div className="mb-2">
                                    <input
                                        type="time"
                                        value={timeDiscount}
                                        onChange={(e) => setTimeDiscount(e.target.value)}
                                        className="form-control"
                                    ></input>
                                    <input
                                        type="date"
                                        style={{ marginTop: '5px' }}
                                        value={dateDiscount}
                                        onChange={(e) => setDateDiscount(e.target.value)}
                                        className="form-control"
                                    ></input>
                                </div>

                                <div className="d-grid">
                                    {idDiscount ? (
                                        <button onClick={handleUpdate} className="btn btn-primary py-3 color-orange">
                                            Cập nhật
                                        </button>
                                    ) : (
                                        <button onClick={handleSave} className="btn btn-primary py-3 color-orange">
                                            Lưu
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-8 col-lg-8">
                                <table className="table slider-data">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên mã</th>
                                            <th>Thời hạn</th>
                                            <th>Giá tiền</th>
                                            <th>Số lượng</th>
                                            <th className="text-end">Chỉnh sửa</th>
                                        </tr>
                                    </thead>
                                    {/* Table Data */}
                                    <tbody>
                                        {discount &&
                                            discount?.map((data, index) => (
                                                <tr key={data?._id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <b>{data?.nameDiscount}</b>
                                                    </td>
                                                    <td>
                                                        <span>{`${data?.date1} ${data?.date2}`}</span>
                                                    </td>
                                                    <td>
                                                        <span>{data?.priceDiscount.toLocaleString('de-DE')}</span>
                                                    </td>
                                                    <td>
                                                        <span>{data?.countInStock}</span>
                                                    </td>
                                                    <td className="text-end">
                                                        <div className="dropdown">
                                                            <Link
                                                                to="#"
                                                                data-bs-toggle="dropdown"
                                                                className="btn btn-light"
                                                            >
                                                                <i className="fas fa-ellipsis-h"></i>
                                                            </Link>
                                                            <div className="dropdown-menu">
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => setIddiscount(data?._id)}
                                                                >
                                                                    Sửa thông tin
                                                                </button>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() =>
                                                                        dispatch(
                                                                            verifiDiscountAction({
                                                                                id: data?._id,
                                                                                verifi: true,
                                                                            }),
                                                                        )
                                                                    }
                                                                >
                                                                    Tặng mã
                                                                </button>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => {
                                                                        if (
                                                                            window.confirm('Bạn có muốn xóa hay không')
                                                                        ) {
                                                                            dispatch(
                                                                                deleteDiscountAction({ id: data?._id }),
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    Xóa
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MainDiscount;
