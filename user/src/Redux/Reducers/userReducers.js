import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    CREACTE_USER_REQUEST,
    CREACTE_USER_SUCCESS,
    CREACTE_USER_FAIL,
    CREACTE_USER_RESET,
    GET_GIFT_REQUEST,
    GET_GIFT_SUCCESS,
    GET_GIFT_FAIL,
    ADD_GIFT_REQUEST,
    ADD_GIFT_SUCCESS,
    ADD_GIFT_FAIL,
    ADD_GIFT_RESET,
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

// REGISTER
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// USER DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload, success: true };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case USER_DETAILS_RESET:
            return { user: {} };
        default:
            return state;
    }
};

// UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_UPDATE_PASSWORD_SUCCESS:
            return { loading: false, successPass: true, userInfo: action.payload };
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_PROFILE_RESET:
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

// CREATE USER
export const createUserReducer = (state = [], action) => {
    switch (action.type) {
        case CREACTE_USER_REQUEST:
            return { loading: true };
        case CREACTE_USER_SUCCESS:
            return { loading: false, createUs: action.payload, sucss: true };
        case CREACTE_USER_FAIL:
            return { loading: false, error: action.payload };
        case CREACTE_USER_RESET:
            return {};
        default:
            return state;
    }
};

// GET ALL GIFT
export const getGiftReducer = (state = [], action) => {
    switch (action.type) {
        case GET_GIFT_REQUEST:
            return { loading: true };
        case GET_GIFT_SUCCESS:
            return { loading: false, giftall: action.payload, success: true };
        case GET_GIFT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// GET ALL GIFT
export const addGiftReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_GIFT_REQUEST:
            return { loading: true };
        case ADD_GIFT_SUCCESS:
            return { loading: false, gift: action.payload, success: true };
        case ADD_GIFT_FAIL:
            return { loading: false, error: action.payload };
        case ADD_GIFT_RESET:
            return {};
        default:
            return state;
    }
};
