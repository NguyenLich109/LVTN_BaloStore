import {
    ORDER_CANCEL_FAIL,
    ORDER_CANCEL_REQUEST,
    ORDER_CANCEL_RESET,
    ORDER_CANCEL_SUCCESS,
    ORDER_COMPLETE_ADMIN_FAIL,
    ORDER_COMPLETE_ADMIN_REQUEST,
    ORDER_COMPLETE_ADMIN_RESET,
    ORDER_COMPLETE_ADMIN_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_RESET,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_ERROR_PAID_CONTENT_FAIL,
    ORDER_ERROR_PAID_CONTENT_REQUEST,
    ORDER_ERROR_PAID_CONTENT_RESET,
    ORDER_ERROR_PAID_CONTENT_SUCCESS,
    ORDER_ERROR_PAID_FAIL,
    ORDER_ERROR_PAID_REQUEST,
    ORDER_ERROR_PAID_RESET,
    ORDER_ERROR_PAID_SUCCESS,
    ORDER_GUARANTEE_REQUEST,
    ORDER_GUARANTEE_SUCCESS,
    ORDER_GUARANTEE_FAIL,
    ORDER_GUARANTEE_RESET,
    ORDER_LIST_COMPLETE_FAIL,
    ORDER_LIST_COMPLETE_REQUEST,
    ORDER_LIST_COMPLETE_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAID_FAIL,
    ORDER_PAID_REQUEST,
    ORDER_PAID_RESET,
    ORDER_PAID_SUCCESS,
    ORDER_WAITCONFIRMATION_FAIL,
    ORDER_WAITCONFIRMATION_REQUEST,
    ORDER_WAITCONFIRMATION_RESET,
    ORDER_WAITCONFIRMATION_SUCCESS,
    ORDER_NOTE_GUAREEN_REQUEST,
    ORDER_NOTE_GUAREEN_SUCCESS,
    ORDER_NOTE_GUAREEN_FAIL,
    ORDER_NOTE_GUAREEN_RESET,
    PRINT_ORDER_REQUEST,
    PRINT_ORDER_SUCCESS,
    PRINT_ORDER_FAIL,
    PRINT_ORDER_RESET,
} from '../Constants/OrderConstants';

export const orderListReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true };
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderListCompleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_LIST_COMPLETE_REQUEST:
            return { loading: true };
        case ORDER_LIST_COMPLETE_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case ORDER_LIST_COMPLETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ORDER DETAILS
export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// ORDER DELIVERED
export const orderDeliveredReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVERED_REQUEST:
            return { loading: true };
        case ORDER_DELIVERED_SUCCESS:
            return { loading: false, success: true };
        case ORDER_DELIVERED_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_DELIVERED_RESET:
            return {};
        default:
            return state;
    }
};

export const orderPaidReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAID_REQUEST:
            return { loading: true };
        case ORDER_PAID_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAID_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAID_RESET:
            return {};
        default:
            return state;
    }
};

export const orderCancelReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CANCEL_REQUEST:
            return { loading: true };
        case ORDER_CANCEL_SUCCESS:
            return { loading: false, success: true };
        case ORDER_CANCEL_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CANCEL_RESET:
            return {};
        default:
            return state;
    }
};

export const orderwaitConfirmationReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_WAITCONFIRMATION_REQUEST:
            return { loading: true };
        case ORDER_WAITCONFIRMATION_SUCCESS:
            return { loading: false, success: true };
        case ORDER_WAITCONFIRMATION_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_WAITCONFIRMATION_RESET:
            return {};
        default:
            return state;
    }
};

export const ordercompleteAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_COMPLETE_ADMIN_REQUEST:
            return { loading: true };
        case ORDER_COMPLETE_ADMIN_SUCCESS:
            return { loading: false, success: true };
        case ORDER_COMPLETE_ADMIN_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_COMPLETE_ADMIN_RESET:
            return {};
        default:
            return state;
    }
};

export const orderErrorPaidReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_ERROR_PAID_REQUEST:
            return { loading: true };
        case ORDER_ERROR_PAID_SUCCESS:
            return { loading: false, success: true };
        case ORDER_ERROR_PAID_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_ERROR_PAID_RESET:
            return {};
        default:
            return state;
    }
};

export const orderContentErrorPaidReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_ERROR_PAID_CONTENT_REQUEST:
            return { loading: true };
        case ORDER_ERROR_PAID_CONTENT_SUCCESS:
            return { loading: false, success: true };
        case ORDER_ERROR_PAID_CONTENT_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_ERROR_PAID_CONTENT_RESET:
            return {};
        default:
            return state;
    }
};

export const orderGuaranteeReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_GUARANTEE_REQUEST:
            return { loading: true };
        case ORDER_GUARANTEE_SUCCESS:
            return { loading: false, success: true };
        case ORDER_GUARANTEE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_GUARANTEE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderNoteGuaranteeReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_NOTE_GUAREEN_REQUEST:
            return { loading: true };
        case ORDER_NOTE_GUAREEN_SUCCESS:
            return { loading: false, success: true };
        case ORDER_NOTE_GUAREEN_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_NOTE_GUAREEN_RESET:
            return {};
        default:
            return state;
    }
};

export const printOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case PRINT_ORDER_REQUEST:
            return { loading: true };
        case PRINT_ORDER_SUCCESS:
            return { loading: false, success: true, file: action.payload };
        case PRINT_ORDER_FAIL:
            return { loading: false, error: action.payload };
        case PRINT_ORDER_RESET:
            return {};
        default:
            return state;
    }
};
