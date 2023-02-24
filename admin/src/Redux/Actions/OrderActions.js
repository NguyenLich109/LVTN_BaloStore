import {
    ORDER_CANCEL_FAIL,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_SUCCESS,
    ORDER_COMPLETE_ADMIN_FAIL,
    ORDER_COMPLETE_ADMIN_REQUEST,
    ORDER_COMPLETE_ADMIN_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_ERROR_PAID_CONTENT_FAIL,
    ORDER_ERROR_PAID_CONTENT_REQUEST,
    ORDER_ERROR_PAID_CONTENT_SUCCESS,
    ORDER_ERROR_PAID_FAIL,
    ORDER_ERROR_PAID_REQUEST,
    ORDER_ERROR_PAID_SUCCESS,
    ORDER_GUARANTEE_FAIL,
    ORDER_GUARANTEE_REQUEST,
    ORDER_GUARANTEE_SUCCESS,
    ORDER_LIST_COMPLETE_FAIL,
    ORDER_LIST_COMPLETE_REQUEST,
    ORDER_LIST_COMPLETE_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_NOTE_GUAREEN_FAIL,
    ORDER_NOTE_GUAREEN_REQUEST,
    ORDER_NOTE_GUAREEN_SUCCESS,
    ORDER_PAID_FAIL,
    ORDER_PAID_REQUEST,
    ORDER_PAID_SUCCESS,
    ORDER_WAITCONFIRMATION_FAIL,
    ORDER_WAITCONFIRMATION_REQUEST,
    ORDER_WAITCONFIRMATION_SUCCESS,
    PRINT_ORDER_FAIL,
    PRINT_ORDER_REQUEST,
    PRINT_ORDER_SUCCESS,
} from '../Constants/OrderConstants';
import { logout } from './userActions';
import axios from 'axios';

export const listOrders = (values) => async (dispatch, getState) => {
    try {
        const { keyword, status, pageNumber, date1, date2 } = values;
        dispatch({ type: ORDER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/orders/all?keyword=${keyword ? keyword : ''}&status=${status ? status : ''}&pageNumber=${
                pageNumber ? pageNumber : ''
            }&date1=${date1 ? date1 : ''}&date2=${date2 ? date2 : ''}`,
            config,
        );

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        });
    }
};

// GET ALL COMPLETE ADMIN
export const getOrderCompleteAll = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_COMPLETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/complete`, config);
        dispatch({ type: ORDER_LIST_COMPLETE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_COMPLETE_FAIL,
            payload: message,
        });
    }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// ORDER DELIVER
export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVERED_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${order._id}/deliveredAdmin`, {}, config);
        dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: message,
        });
    }
};

//order PAID
export const paidOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAID_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${order._id}/paidAdmin`, {}, config);
        dispatch({ type: ORDER_PAID_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_PAID_FAIL,
            payload: message,
        });
    }
};

export const cancelOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CANCEL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/orders/${order._id}/cancel`, config);
        dispatch({ type: ORDER_CANCEL_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_CANCEL_FAIL,
            payload: message,
        });
    }
};

export const waitConfirmationOrder = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_WAITCONFIRMATION_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/waitConfirmation`, { status }, config);
        dispatch({ type: ORDER_WAITCONFIRMATION_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_WAITCONFIRMATION_FAIL,
            payload: message,
        });
    }
};

export const completeAdminOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_COMPLETE_ADMIN_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/completeAdmin`, {}, config);
        dispatch({ type: ORDER_COMPLETE_ADMIN_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_COMPLETE_ADMIN_FAIL,
            payload: message,
        });
    }
};

export const orderErrorPaidAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_ERROR_PAID_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/errorPaidAdmin`, {}, config);
        dispatch({ type: ORDER_ERROR_PAID_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_ERROR_PAID_FAIL,
            payload: message,
        });
    }
};

export const orderContentPaidAction = (value) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_ERROR_PAID_CONTENT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/orders/${value.id}/contentErrorPaidAdmin`,
            { content: value.content },
            config,
        );
        dispatch({ type: ORDER_ERROR_PAID_CONTENT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_ERROR_PAID_CONTENT_FAIL,
            payload: message,
        });
    }
};

export const orderGuaranteeAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_GUARANTEE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${id}/guarantee`, {}, config);
        dispatch({ type: ORDER_GUARANTEE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_GUARANTEE_FAIL,
            payload: message,
        });
    }
};

export const orderNoteGuaranteeAction = (value) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_NOTE_GUAREEN_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/orders/${value.id}/noteGuarantee`, { note: value.note }, config);
        dispatch({ type: ORDER_NOTE_GUAREEN_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_NOTE_GUAREEN_FAIL,
            payload: message,
        });
    }
};

export const printAction = (value) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRINT_ORDER_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/orders/print`, value, config);
        dispatch({ type: PRINT_ORDER_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: PRINT_ORDER_FAIL,
            payload: message,
        });
    }
};
