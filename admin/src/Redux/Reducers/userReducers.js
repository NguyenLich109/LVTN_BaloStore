import {
    ADD_GIFT_FAIL,
    ADD_GIFT_REQUEST,
    ADD_GIFT_RESET,
    ADD_GIFT_SUCCESS,
    CREATE_IMAGE_USER_FAIL,
    CREATE_IMAGE_USER_REQUEST,
    CREATE_IMAGE_USER_RESET,
    CREATE_IMAGE_USER_SUCCESS,
    CREATE_USER_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_RESET,
    CREATE_USER_SUCCESS,
    GET_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    SEND_EMAIL_USER_FAIL,
    SEND_EMAIL_USER_REQUEST,
    SEND_EMAIL_USER_RESET,
    SEND_EMAIL_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
    USER_DISABLED_FAIL,
    USER_DISABLED_REQUEST,
    USER_DISABLED_RESET,
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

// LOGIN
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

// ALL USER
export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case USER_LIST_RESET:
            return { users: [] };
        default:
            return state;
    }
};

// PUT USER
export const userdisabledReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DISABLED_REQUEST:
            return { loading: true };
        case USER_DISABLED_SUCCESS:
            return { loading: false, userNoti: action.payload, success: true };
        case USER_DISABLED_FAIL:
            return { loading: false, error: action.payload };
        case USER_DISABLED_RESET:
            return {};
        default:
            return state;
    }
};

// CREATE USER
export const createUserReduct = (state = {}, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return { loading: true };
        case CREATE_USER_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true };
        case CREATE_USER_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_USER_RESET:
            return {};
        default:
            return state;
    }
};

// CRATEB IMAGE USER
export const createImageUserReduct = (state = {}, action) => {
    switch (action.type) {
        case CREATE_IMAGE_USER_REQUEST:
            return { loading: true };
        case CREATE_IMAGE_USER_SUCCESS:
            return { loading: false, urlImage: action.payload, success: true };
        case CREATE_IMAGE_USER_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_IMAGE_USER_RESET:
            return {};
        default:
            return state;
    }
};

// CRATEB IMAGE USER
export const sendEmailUserReduce = (state = {}, action) => {
    switch (action.type) {
        case SEND_EMAIL_USER_REQUEST:
            return { loading: true };
        case SEND_EMAIL_USER_SUCCESS:
            return { loading: false, success: true };
        case SEND_EMAIL_USER_FAIL:
            return { loading: false, error: action.payload };
        case SEND_EMAIL_USER_RESET:
            return {};
        default:
            return state;
    }
};

// UPDATE PROFILE USER
export const updateProfileReduce = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return { loading: true };
        case UPDATE_USER_SUCCESS:
            return { loading: false, retultPass: action.payload, success: true };
        case UPDATE_USER_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_USER_RESET:
            return {};
        default:
            return state;
    }
};

// UPDATE PROFILE USER
export const getUserReduce = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return { loading: true };
        case GET_USER_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true };
        case GET_USER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ADD GIFT
export const giftReduce = (state = {}, action) => {
    switch (action.type) {
        case ADD_GIFT_REQUEST:
            return { loading: true };
        case ADD_GIFT_SUCCESS:
            return { loading: false, success: true };
        case ADD_GIFT_FAIL:
            return { loading: false, error: action.payload };
        case ADD_GIFT_RESET:
            return {};
        default:
            return state;
    }
};
