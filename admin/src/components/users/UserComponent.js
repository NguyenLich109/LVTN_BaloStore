import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUser, disabledUser, sendEmailAction, updateProfileUser } from '../../Redux/Actions/userActions';
import { USER_DISABLED_RESET, SEND_EMAIL_USER_RESET, UPDATE_USER_RESET } from '../../Redux/Constants/UserContants';
import { toast } from 'react-toastify';
import Toast from '../LoadingError/Toast';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const UserComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const userdisabled = useSelector((state) => state.userdisabled);
    const { userNoti, error: errorDisabled } = userdisabled;
    const sendEmailUser = useSelector((state) => state.sendEmailUser);
    const { loading: loadingSendEmail, success: successSendEmail } = sendEmailUser;
    const updateProfileReduce = useSelector((state) => state.updateProfileReduce);
    const { loading: updateloading, success: updatesuccess } = updateProfileReduce;

    useEffect(() => {
        dispatch(listUser());
    }, [dispatch]);

    useEffect(() => {
        if (successSendEmail) {
            dispatch({ type: SEND_EMAIL_USER_RESET });
            toast.success('Đã gửi thông tin tài khoản qua email của tài khoản này', ToastObjects);
        }
    }, [dispatch, successSendEmail]);

    useEffect(() => {
        if (updatesuccess) {
            dispatch({ type: UPDATE_USER_RESET });
            toast.success('Tài khoản đã được reset', ToastObjects);
        }
    }, [dispatch, updatesuccess]);

    useEffect(() => {
        if (userNoti?.disabled) {
            toast.success('Bạn đã khóa tài khoản thành công', ToastObjects);
            dispatch(listUser());
        }
        if (userNoti?.disabled === false) {
            toast.success('Tài khoản đã được mở khóa thành công', ToastObjects);
            dispatch(listUser());
        }
        if (errorDisabled === 'error') {
            toast.error('Không thể thao tác tài khoản này', ToastObjects);
        }
        if (errorDisabled === 'true') {
            toast.error('Bạn đã khóa tài khoản này rồi', ToastObjects);
        }
        if (errorDisabled === 'false') {
            toast.error('Tài khoản này đã được mở khóa rồi', ToastObjects);
        }
        dispatch({ type: USER_DISABLED_RESET });
    }, [userNoti, errorDisabled]);

    const onDisabled = (id, disabled) => {
        if (window.confirm('Bạn có muốn khóa tài khoản này không')) {
            dispatch(disabledUser(id, disabled));
        }
    };
    const offDisabled = (id, disabled) => {
        if (window.confirm('Bạn có muốn mở khóa tài khoản này không')) {
            dispatch(disabledUser(id, disabled));
        }
    };
    const handleSendEmail = (user) => {
        if (!user?.isNv) {
            toast.error('Tài khoản không sử dụng được chức năng này', ToastObjects);
        } else {
            dispatch(sendEmailAction({ email: user?.email }));
        }
    };
    const handleResetUser = (user) => {
        dispatch(updateProfileUser({ id: user?._id, password: user?.email }));
    };
    const handleLink = (id) => {
        history.push(`/updateUser/${id}`);
    };
    //hết
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Tài khoản người dùng</h2>
            </div>
            <div className="card mb-4">
                {/* Card */}
                <div className="card-body">
                    <Toast />
                    {loadingSendEmail && <Loading />}
                    {updateloading && <Loading />}
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                            {users?.map((user) => (
                                <div className="col-3 col-sm-3 col-md-3 col-lg-3" key={user._id}>
                                    <div className="card card-user shadow-sm">
                                        <div style={{ backgroundColor: '#9dd3f1' }}>
                                            <div className="dropdown">
                                                <button data-bs-toggle="dropdown" className="btn btn-light">
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    {!user?.isAdmin && (
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                onDisabled(user._id, true);
                                                            }}
                                                        >
                                                            Khóa tài khoản
                                                        </button>
                                                    )}
                                                    {!user?.isAdmin && (
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                offDisabled(user._id, false);
                                                            }}
                                                        >
                                                            Mở tài khoản
                                                        </button>
                                                    )}
                                                    {user?.isNv && (
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                handleLink(user?._id);
                                                            }}
                                                        >
                                                            Chỉnh sửa
                                                        </button>
                                                    )}
                                                    {!user?.isAdmin && (
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                handleResetUser(user);
                                                            }}
                                                        >
                                                            Cấp lại mật khẩu
                                                        </button>
                                                    )}
                                                    {user?.isNv && (
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                handleSendEmail(user);
                                                            }}
                                                        >
                                                            Gửi TK cho nhân viên
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-header">
                                            <img
                                                className={`img-md img-avatar ${user.disabled ? 'opacity-25' : ''}`}
                                                src={
                                                    user?.image === undefined
                                                        ? '/images/user.png'
                                                        : `/userProfile/${user?.image}`
                                                }
                                                alt="User pic"
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title mt-5">{user.name}</h5>
                                            <div className="card-text text-muted">
                                                {user?.isAdmin === true ? (
                                                    <p className="m-0">Admin</p>
                                                ) : user?.isNv === true ? (
                                                    <p className="m-0">Nhân viên Shipper</p>
                                                ) : (
                                                    <p className="m-0">Khách hàng</p>
                                                )}

                                                <p>
                                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserComponent;
