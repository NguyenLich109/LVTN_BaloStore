import { CHECK_DISCOUNT_FAIL, CHECK_DISCOUNT_REQUEST, CHECK_DISCOUNT_SUCCESS } from '../Constants/DiscountConstants';
import { logout } from './userActions';
import axios from 'axios';

// CHECK DICOUNT
export const checkDiscountAction = (value) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHECK_DISCOUNT_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/discount/check`, value, config);
        dispatch({ type: CHECK_DISCOUNT_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: CHECK_DISCOUNT_FAIL,
            payload: message,
        });
    }
};
