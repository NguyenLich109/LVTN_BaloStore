import {
    ADD_GIFT_FAIL,
    ADD_GIFT_REQUEST,
    ADD_GIFT_SUCCESS,
    CREATE_IMAGE_USER_FAIL,
    CREATE_IMAGE_USER_REQUEST,
    CREATE_IMAGE_USER_SUCCESS,
    CREATE_USER_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    GET_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    SEND_EMAIL_USER_FAIL,
    SEND_EMAIL_USER_REQUEST,
    SEND_EMAIL_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_DISABLED_FAIL,
    USER_DISABLED_REQUEST,
    USER_DISABLED_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../Constants/UserContants';
import axios from 'axios';

// LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`/api/users/loginAdmin`, { email, password }, config);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: message,
        });
    }
};

// LOGOUT
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_LIST_RESET });
};

export const getUserAction =
    ({ id }) =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: GET_USER_REQUEST });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`/api/users/${id}/user`, config);

            dispatch({ type: GET_USER_SUCCESS, payload: data });
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message;
            if (message === 'Not authorized, token failed') {
                dispatch(logout());
            }
            dispatch({
                type: GET_USER_FAIL,
                payload: message,
            });
        }
    };

// ALL USER
export const listUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users`, config);

        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message,
        });
    }
};

// LOOK ACCOUNT
export const disabledUser = (id, disabled) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DISABLED_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/${id}/disabled`, { disabled }, config);

        dispatch({ type: USER_DISABLED_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_DISABLED_FAIL,
            payload: message,
        });
    }
};

export const createImageUserAction = (images) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_IMAGE_USER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post(`/api/uploadAvatar/`, images, config);

        dispatch({ type: CREATE_IMAGE_USER_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CREATE_IMAGE_USER_FAIL,
            payload: message,
        });
    }
};

export const createUser = (data) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_USER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/users/nhanvien`, data, config);
        dispatch({ type: CREATE_USER_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CREATE_USER_FAIL,
            payload: message,
        });
    }
};

//GUI TK QUA EMAIL
export const sendEmailAction = (data) => async (dispatch, getState) => {
    try {
        dispatch({ type: SEND_EMAIL_USER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/users/sendEmail`, data, config);
        dispatch({ type: SEND_EMAIL_USER_SUCCESS });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: SEND_EMAIL_USER_FAIL,
            payload: message,
        });
    }
};

//UPDATE PROFILE USER
export const updateProfileUser = (data) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { value } = await axios.put(`/api/users/updateProfile`, data, config);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: value });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: message,
        });
    }
};

//ADD GIFT
export const addGiftAction = (values) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_GIFT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/addGift`, values, config);
        dispatch({ type: ADD_GIFT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ADD_GIFT_FAIL,
            payload: message,
        });
    }
};
