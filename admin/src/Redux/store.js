import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userListReducer,
    userLoginReducer,
    userdisabledReducer,
    createUserReduct,
    createImageUserReduct,
    sendEmailUserReduce,
    updateProfileReduce,
    getUserReduce,
    giftReduce,
} from './Reducers/userReducers';
import {
    productCreateReducer,
    optionColorCreateReducer,
    productDeleteReducer,
    productEditReducer,
    productListReducer,
    productUpdateReducer,
    listProductCommentAllReducer,
    productCreateCommentChildReducer,
    productOptionUpdateReducer,
    productDeleteOptionReducer,
    productCreateImageReducer,
    productDeleteImageReducer,
    productDeleteCommentsReducer,
    productDeleteCommentsChildReducer,
} from './Reducers/ProductReducers';
import {
    orderCancelReducer,
    orderDeliveredReducer,
    orderDetailsReducer,
    orderListReducer,
    orderPaidReducer,
    ordercompleteAdminReducer,
    orderwaitConfirmationReducer,
    orderListCompleteReducer,
    orderNoteGuaranteeReducer,
    orderGuaranteeReducer,
    orderContentErrorPaidReducer,
    orderErrorPaidReducer,
    printOrderReducer,
} from './Reducers/OrderReducres';
import { sliderCreateReducer, sliderDeleteReducer, sliderListReducer } from './Reducers/SliderListReducers';
import {
    newsCreateReducer,
    newsDeleteReducer,
    newsListReducer,
    editNewsReducer,
    newsUpdateReducer,
} from './Reducers/NewsReduce';
import {
    categoryAddReducer,
    categoryDeleteReducer,
    categoryListReducer,
    categoryUpdateReducer,
} from './Reducers/CategoryReducers';
import {
    createDiscountReduce,
    getDiscountReduce,
    updateDiscountReduce,
    deleteDiscountReduce,
    verifiDiscountReduce,
} from './Reducers/DiscountReduce';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    userdisabled: userdisabledReducer,
    createUserReduct,
    createImageUser: createImageUserReduct,
    sendEmailUser: sendEmailUserReduce,
    updateProfileReduce,
    getUserReduce,
    giftReduce,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productOptionDelete: productDeleteOptionReducer,
    productCreate: productCreateReducer,
    optionColorCreate: optionColorCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    productOptionUpdate: productOptionUpdateReducer,
    productCommentGet: listProductCommentAllReducer,
    productCommentChildCreate: productCreateCommentChildReducer,
    productCreateImage: productCreateImageReducer,
    productDeleteImage: productDeleteImageReducer,
    productDeleteComments: productDeleteCommentsReducer,
    productDeleteCommentsChild: productDeleteCommentsChildReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderDeliver: orderDeliveredReducer,
    orderPaid: orderPaidReducer,
    orderCancel: orderCancelReducer,
    orderwaitGetConfirmation: orderwaitConfirmationReducer,
    orderGetcompleteAdmin: ordercompleteAdminReducer,
    orderListComplete: orderListCompleteReducer,
    orderNoteGuaranteeReducer,
    orderGuaranteeReducer,
    orderContentErrorPaidReducer,
    orderErrorPaidReducer,
    printOrderReducer,
    sliderList: sliderListReducer,
    deleteSlider: sliderDeleteReducer,
    sliderCreate: sliderCreateReducer,
    newsList: newsListReducer,
    deleteNews: newsDeleteReducer,
    newsCreate: newsCreateReducer,
    getEditNews: editNewsReducer,
    newsUpdate: newsUpdateReducer,
    CategoryList: categoryListReducer,
    CategoryDelete: categoryDeleteReducer,
    CategoryAdd: categoryAddReducer,
    CategoryUpdate: categoryUpdateReducer,
    createDiscountReduce,
    getDiscountReduce,
    updateDiscountReduce,
    deleteDiscountReduce,
    verifiDiscountReduce,
});

// login
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
