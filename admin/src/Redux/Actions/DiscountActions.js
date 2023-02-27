import {
    CREATE_DISCOUNT_FAIL,
    CREATE_DISCOUNT_REQUEST,
    CREATE_DISCOUNT_SUCCESS,
    DELETE_DISCOUNT_FAIL,
    DELETE_DISCOUNT_REQUEST,
    DELETE_DISCOUNT_SUCCESS,
    GET_DISCOUNT_FAIL,
    GET_DISCOUNT_REQUEST,
    GET_DISCOUNT_SUCCESS,
    UPDATE_DISCOUNT_FAIL,
    UPDATE_DISCOUNT_REQUEST,
    UPDATE_DISCOUNT_SUCCESS,
    VERIFI_DISCOUNT_FAIL,
    VERIFI_DISCOUNT_REQUEST,
    VERIFI_DISCOUNT_SUCCESS,
} from '../Constants/DiscountContainer';
import { logout } from './userActions';
import axios from 'axios';

export const createDiscountAction = (values) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_DISCOUNT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/discount/create`, values, config);
        dispatch({ type: CREATE_DISCOUNT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CREATE_DISCOUNT_FAIL,
            payload: message,
        });
    }
};

export const getDiscountAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_DISCOUNT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/discount/all`, config);
        dispatch({ type: GET_DISCOUNT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: GET_DISCOUNT_FAIL,
            payload: message,
        });
    }
};

export const updateDiscountAction = (values) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_DISCOUNT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/discount/${values.id}/update`, values, config);
        dispatch({ type: UPDATE_DISCOUNT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: UPDATE_DISCOUNT_FAIL,
            payload: message,
        });
    }
};

export const deleteDiscountAction = (value) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_DISCOUNT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/discount/${value.id}/delete`, {}, config);
        dispatch({ type: DELETE_DISCOUNT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: DELETE_DISCOUNT_FAIL,
            payload: message,
        });
    }
};

export const verifiDiscountAction = (value) => async (dispatch, getState) => {
    try {
        dispatch({ type: VERIFI_DISCOUNT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/discount/${value.id}/verifi`, { verifi: value.verifi }, config);
        dispatch({ type: VERIFI_DISCOUNT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: VERIFI_DISCOUNT_FAIL,
            payload: message,
        });
    }
};
