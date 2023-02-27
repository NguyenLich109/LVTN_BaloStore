import {
    CREATE_DISCOUNT_FAIL,
    CREATE_DISCOUNT_REQUEST,
    CREATE_DISCOUNT_RESET,
    CREATE_DISCOUNT_SUCCESS,
    DELETE_DISCOUNT_FAIL,
    DELETE_DISCOUNT_REQUEST,
    DELETE_DISCOUNT_RESET,
    DELETE_DISCOUNT_SUCCESS,
    GET_DISCOUNT_FAIL,
    GET_DISCOUNT_REQUEST,
    GET_DISCOUNT_SUCCESS,
    UPDATE_DISCOUNT_FAIL,
    UPDATE_DISCOUNT_REQUEST,
    UPDATE_DISCOUNT_RESET,
    UPDATE_DISCOUNT_SUCCESS,
    VERIFI_DISCOUNT_FAIL,
    VERIFI_DISCOUNT_REQUEST,
    VERIFI_DISCOUNT_RESET,
    VERIFI_DISCOUNT_SUCCESS,
} from '../Constants/DiscountContainer';

export const createDiscountReduce = (state = {}, action) => {
    switch (action.type) {
        case CREATE_DISCOUNT_REQUEST:
            return { loading: true };
        case CREATE_DISCOUNT_SUCCESS:
            return { loading: false, vai: action.payload, success: true };
        case CREATE_DISCOUNT_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_DISCOUNT_RESET:
            return {};
        default:
            return state;
    }
};

export const getDiscountReduce = (state = {}, action) => {
    switch (action.type) {
        case GET_DISCOUNT_REQUEST:
            return { loading: true };
        case GET_DISCOUNT_SUCCESS:
            return { loading: false, discount: action.payload, success: true };
        case GET_DISCOUNT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateDiscountReduce = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_DISCOUNT_REQUEST:
            return { loading: true };
        case UPDATE_DISCOUNT_SUCCESS:
            return { loading: false, updateDiscount: action.payload, success: true };
        case UPDATE_DISCOUNT_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_DISCOUNT_RESET:
            return {};
        default:
            return state;
    }
};

export const deleteDiscountReduce = (state = {}, action) => {
    switch (action.type) {
        case DELETE_DISCOUNT_REQUEST:
            return { loading: true };
        case DELETE_DISCOUNT_SUCCESS:
            return { loading: false, success: true };
        case DELETE_DISCOUNT_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_DISCOUNT_RESET:
            return {};
        default:
            return state;
    }
};

export const verifiDiscountReduce = (state = {}, action) => {
    switch (action.type) {
        case VERIFI_DISCOUNT_REQUEST:
            return { loading: true };
        case VERIFI_DISCOUNT_SUCCESS:
            return { loading: false, success: true };
        case VERIFI_DISCOUNT_FAIL:
            return { loading: false, error: action.payload };
        case VERIFI_DISCOUNT_RESET:
            return {};
        default:
            return state;
    }
};
