import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userListReducer, userLoginReducer, userdisabledReducer, updatePasswordReduce } from './Reducers/userReducers';
import {
    orderCancelReducer,
    orderDeliveredReducer,
    orderDetailsReducer,
    orderListReducer,
    orderPaidReducer,
    ordercompleteAdminReducer,
    orderwaitConfirmationReducer,
    orderListCompleteReducer,
    getAllOrderNvReducer,
    orderReceiveDetailsReducer,
    orderErrorPaidReducer,
    orderContentErrorPaidReducer,
} from './Reducers/OrderReducres';

const reducer = combineReducers({
    updatePasswordReduce,
    userLogin: userLoginReducer,
    userList: userListReducer,
    userdisabled: userdisabledReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderDeliver: orderDeliveredReducer,
    orderPaid: orderPaidReducer,
    orderCancel: orderCancelReducer,
    orderwaitGetConfirmation: orderwaitConfirmationReducer,
    orderGetcompleteAdmin: ordercompleteAdminReducer,
    orderListComplete: orderListCompleteReducer,
    getAllOrder: getAllOrderNvReducer,
    orderReceiveDetails: orderReceiveDetailsReducer,
    orderContentErrorPaid: orderContentErrorPaidReducer,
    orderErrorPaid: orderErrorPaidReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
