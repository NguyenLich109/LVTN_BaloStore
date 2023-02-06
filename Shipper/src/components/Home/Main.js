import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPass } from '../../Redux/Actions/userActions';
import { USER_UPDATE_RESET } from '../../Redux/Constants/UserContants';
import Toast from '../LoadingError/Toast';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { toast } from 'react-toastify';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const Main = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogin);
    const { userInfo } = user;
    const updatePasswordReduce = useSelector((state) => state.updatePasswordReduce);
    const { loading, success, error } = updatePasswordReduce;

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [cfPassword, setCfPassword] = useState('');
    const [retult, setRetult] = useState('');
    console.log(updatePasswordReduce);

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_RESET });
            toast.success('Đổi mật khẩu thành công', ToastObjects);
        }
    }, [dispatch, success]);

    const checkPassword = (data) => {
        const { oldPassword, password, cfPassword } = data;
        if (oldPassword === '' || password === '' || cfPassword === '') {
            setRetult('Vui lòng điền đầy đủ thông tin');
        } else {
            if (password.length < 5) {
                setRetult('Mật khẩu chưa đủ 6 kí tự');
            } else {
                if (password !== cfPassword) {
                    setRetult('Mật khẩu mới hoặc mật khẩu nhập lại chưa đúng');
                } else {
                    setRetult('');
                    dispatch(updateUserPass({ oldPassword, password, id: userInfo?._id }));
                }
            }
        }
    };
    const handleClick = (e) => {
        e.preventDefault();
        if (!checkPassword({ oldPassword, password, cfPassword })) return;
    };

    return (
        <>
            <Toast />
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Thông tin cá nhân </h2>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img
                                src={`/userProfile/${userInfo?.image}`}
                                alt="Img"
                                style={{ height: '150px', width: '150px', borderRadius: '50%', objectFit: 'cover' }}
                            ></img>
                            <p style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#exampleModal">
                                Thay đổi mật khẩu
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-6 col-xl-6">
                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <div className="noti-user">
                                    <p>
                                        <b>Họ và tên: </b>
                                        {userInfo?.name}
                                    </p>
                                    <p>
                                        <b>Ngày sinh: </b>
                                        {userInfo?.date}
                                    </p>
                                    <p>
                                        <b>Giới tính: </b>
                                        {userInfo?.sex}
                                    </p>
                                    <p>
                                        <b>CMND/CCCD: </b>
                                        {userInfo?.cmnd}
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <div className="noti-user">
                                    <p>
                                        <b>Số điện thoại: </b>
                                        {userInfo?.phone}
                                    </p>
                                    <p>
                                        <b>Email: </b>
                                        {userInfo?.email}
                                    </p>
                                    <p>
                                        <b>Quê quán: </b>
                                        {userInfo?.homeTown}
                                    </p>
                                    <p>
                                        <b>Chổ ở hiện tại: </b>
                                        {userInfo?.address}, {userInfo?.city}, {userInfo?.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Modal  */}
            <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Thay đổi mật khẩu
                            </h5>
                            <button
                                onClick={() => {
                                    setOldPassword('');
                                    setPassword('');
                                    setCfPassword('');
                                }}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {loading && <Loading />}
                            {error && <Message variant="alert-danger text-center fs-6">{retult}</Message>}
                            {retult !== '' && <Message variant="alert-danger text-center fs-6">{retult}</Message>}
                            <div className="form-group">
                                <label for="Password1">Mật khẩu cũ:</label>
                                <input
                                    type="password"
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    value={oldPassword}
                                    style={{ margin: '0' }}
                                    className="form-control"
                                    id="Password1"
                                    placeholder="Mật khẩu cũ"
                                ></input>
                            </div>
                            <div className="form-group">
                                <label for="Password2">Mật khẩu mới:</label>
                                <input
                                    style={{ margin: '0' }}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    id="Password2"
                                    placeholder="Mật khẩu mới"
                                ></input>
                            </div>
                            <div className="form-group">
                                <label for="Password3">Nhập lại mật khẩu mới:</label>
                                <input
                                    type="password"
                                    value={cfPassword}
                                    onChange={(e) => setCfPassword(e.target.value)}
                                    style={{ margin: '0' }}
                                    className="form-control"
                                    id="Password3"
                                    placeholder="Nhập lại mật khẩu"
                                ></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleClick}>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;
