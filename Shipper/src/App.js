import React, { useEffect } from 'react';
import './App.css';
import './responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import OrderDetailReceiveScreen from './screens/OrderDetailReceiveScreen';
import Login from './screens/LoginScreen';
import UsersScreen from './screens/UsersScreen';
import NotFound from './screens/NotFound';
import PrivateRouter from './PrivateRouter';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from './Redux/Actions/OrderActions';
import { listUser } from './Redux/Actions/userActions';
import OrderReceiveScreen from './screens/OrderReceiveScreen';

function App() {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
            dispatch(listUser());
        }
    }, [dispatch, userInfo]);

    return (
        <>
            <Router>
                <Switch>
                    <PrivateRouter path="/" component={HomeScreen} exact />
                    <PrivateRouter path="/orders" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/page/:pageNumber" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/search/:keyword" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/status/:status" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/search/:keyword/status/:status" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/page/:pageNumber/status/:status" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/page/:pageNumber/search/:keyword" component={OrderScreen} exact />
                    <PrivateRouter path="/orders/page/:pageNumber" component={OrderScreen} exact />
                    <PrivateRouter
                        path="/orders/search/:keyword/page/:pageNumber/status/:status"
                        component={OrderScreen}
                        exact
                    />

                    <PrivateRouter path="/ordersReceive" component={OrderReceiveScreen} exact />
                    <PrivateRouter path="/ordersReceive/page/:pageNumber" component={OrderReceiveScreen} exact />
                    <PrivateRouter path="/ordersReceive/search/:keyword" component={OrderReceiveScreen} exact />
                    <PrivateRouter path="/ordersReceive/status/:status" component={OrderReceiveScreen} exact />
                    <PrivateRouter
                        path="/ordersReceive/search/:keyword/status/:status"
                        component={OrderReceiveScreen}
                        exact
                    />
                    <PrivateRouter
                        path="/ordersReceive/page/:pageNumber/status/:status"
                        component={OrderReceiveScreen}
                        exact
                    />
                    <PrivateRouter
                        path="/ordersReceive/page/:pageNumber/search/:keyword"
                        component={OrderReceiveScreen}
                        exact
                    />
                    <PrivateRouter path="/ordersReceive/page/:pageNumber" component={OrderReceiveScreen} exact />
                    <PrivateRouter
                        path="/ordersReceive/search/:keyword/page/:pageNumber/status/:status"
                        component={OrderReceiveScreen}
                        exact
                    />

                    <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
                    <PrivateRouter path="/orderReceive/:id" component={OrderDetailReceiveScreen} />
                    <PrivateRouter path="/users" component={UsersScreen} />
                    <Route path="/login" component={Login} />
                    <PrivateRouter path="*" component={NotFound} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
