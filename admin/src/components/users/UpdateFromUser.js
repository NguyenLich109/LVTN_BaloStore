import { useState, useEffect } from 'react';
import { createImageUserAction, getUserAction, updateProfileUser } from '../../Redux/Actions/userActions';
import { UPDATE_USER_RESET, CREATE_IMAGE_USER_RESET } from '../../Redux/Constants/UserContants';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';
import './index.css';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

export default function UpdateFromUser({ id }) {
    const dispatch = useDispatch();

    const createImageUser = useSelector((state) => state.createImageUser);
    const { success, urlImage } = createImageUser;
    const updateProfileReduce = useSelector((state) => state.updateProfileReduce);
    const { loading: updateloading, success: updatesuccess } = updateProfileReduce;
    const getUserReduce = useSelector((state) => state.getUserReduce);
    const { userInfo, loading: loadingGetUser } = getUserReduce;

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [phone, setPhone] = useState('');
    const [cmnd, setCmnd] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [sex, setSex] = useState('');
    const [homeTown, setHomeTown] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(getUserAction({ id }));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo?.name);
            setDate(userInfo?.date);
            setSex(userInfo?.sex);
            setPhone(userInfo?.phone);
            setCmnd(userInfo?.cmnd);
            setEmail(userInfo?.email);
            setCountry(userInfo?.country);
            setCity(userInfo?.city);
            setAddress(userInfo?.address);
            setHomeTown(userInfo?.homeTown);
        }
    }, [userInfo]);

    useEffect(() => {
        if (updatesuccess) {
            dispatch({ type: UPDATE_USER_RESET });
            dispatch(getUserAction({ id }));
            toast.success('Đã cập nhật tài khoản thành công', ToastObjects);
        }
    }, [dispatch, updatesuccess, id]);

    useEffect(() => {
        if (success) {
            dispatch({ type: CREATE_IMAGE_USER_RESET });
            dispatch(
                updateProfileUser({
                    name,
                    date,
                    sex,
                    phone,
                    cmnd,
                    email,
                    homeTown,
                    country,
                    city,
                    address,
                    image: urlImage?.filename,
                    id,
                }),
            );
            setImage('');
        }
    }, [dispatch, success, name, date, sex, phone, cmnd, email, homeTown, country, city, address, urlImage, id]);

    const handleCreate = () => {
        if (image === '') {
            dispatch(
                updateProfileUser({
                    name,
                    date,
                    sex,
                    phone,
                    cmnd,
                    email,
                    homeTown,
                    country,
                    city,
                    address,
                    image: userInfo?.image,
                    id,
                }),
            );
        } else {
            let images = new FormData();
            images.append('image', image);
            dispatch(createImageUserAction(images));
        }
    };
    return (
        <>
            <div className="content-main create-user">
                <Toast />
                {loadingGetUser && <Loading />}
                {updateloading && <Loading />}
                <h2>Cập nhật hồ sơ</h2>
                <div className="row">
                    <div className="col-xl-3 col-lg-3 d-flex justify-content-center">
                        <div className="image-user">
                            <img
                                src={image ? URL.createObjectURL(image) : `/userProfile/${userInfo?.image}`}
                                alt="Img"
                                className="create-user__image"
                            ></img>
                            <label htmlFor="image" className="create-user__label">
                                <i className="far fa-camera"></i>
                            </label>
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                            ></input>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9">
                        <div className="row">
                            <div className="col-xl-5 col-lg-5">
                                <div>
                                    <label for="exampleInputEmail1">Họ tên:</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Họ tên"
                                    ></input>
                                </div>
                                <div>
                                    <label for="exampleInputEmail1">Ngày sinh:</label>
                                    <input
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Ngày sinh"
                                    ></input>
                                </div>
                                <div>
                                    <label for="exampleInputEmail1">Giới tính:</label>
                                    <select
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                        class="form-select"
                                        aria-label="Default select example"
                                    >
                                        <option selected>Giới tính:</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="exampleInputEmail1">Số điện thoại:</label>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Số điện thoại"
                                    ></input>
                                </div>
                                <div>
                                    <label for="exampleInputEmail1">CMND/CCCD:</label>
                                    <input
                                        value={cmnd}
                                        onChange={(e) => setCmnd(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="CMND/CCCD"
                                    ></input>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5">
                                <div>
                                    <label for="exampleInputEmail1">Email:</label>
                                    <input
                                        value={email}
                                        disabled
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    ></input>
                                </div>
                                <div>
                                    <label for="exampleInputEmail1">Quê quán:</label>
                                    <input
                                        value={homeTown}
                                        onChange={(e) => setHomeTown(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Quê quán"
                                    ></input>
                                </div>
                                <div>
                                    <label for="exampleInputEmail1">Chổ ở hiện tại: (Tỉnh/Thành phố)</label>
                                    <input
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Tỉnh/Thành phố"
                                    ></input>
                                </div>
                                <div>
                                    <label for="exampleInputEmail1">Chổ ở hiện tại: (Huyện/Quận)</label>
                                    <input
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Huyện/Quận"
                                    ></input>
                                </div>
                                <div>
                                    <label for="exampleInputEmail1">Chổ ở hiện tại: (Đường/Hẻm)</label>
                                    <input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Đường/Hẻm"
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary "
                            style={{ marginTop: '10px', width: '100px' }}
                            onClick={handleCreate}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
