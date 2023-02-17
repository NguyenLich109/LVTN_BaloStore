import {
    CHECK_DISCOUNT_FAIL,
    CHECK_DISCOUNT_REQUEST,
    CHECK_DISCOUNT_RESET,
    CHECK_DISCOUNT_SUCCESS,
} from '../Constants/DiscountConstants';

// CHECK DISCOUT
export const checkDiscountReducer = (state = {}, action) => {
    switch (action.type) {
        case CHECK_DISCOUNT_REQUEST:
            return { loading: true };
        case CHECK_DISCOUNT_SUCCESS:
            return { loading: false, success: true, discount: action.payload };
        case CHECK_DISCOUNT_FAIL:
            return { loading: false, error: action.payload };
        case CHECK_DISCOUNT_RESET:
            return {};
        default:
            return state;
    }
};
