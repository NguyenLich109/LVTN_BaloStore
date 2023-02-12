import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../Middleware/AuthMiddleware.js';
import Product from '../Models/ProductModel.js';
import Order from './../Models/OrderModel.js';
import OrderNv from './../Models/OrderNvModel.js';

const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            phone,
            name,
            email,
        } = req.body;

        if (orderItems.length != 0) {
            for (let i = 0; i < orderItems.length; i++) {
                const product = await Product.findById(orderItems[i].product);
                const findCart = product.optionColor?.find((option) => option.color === orderItems[i].color);
                if (findCart.countInStock < orderItems[i].qty) {
                    res.status(400);
                    throw new Error('Số lượng không đủ đáp ứng');
                }
            }
        } else {
            res.status(400);
            throw new Error('Đặt hàng không thành công');
        }
        if (req?.user?.disabled) {
            res.status(400);
            throw new Error('Tài khoản của bạn đã bị khóa');
        }
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
            return;
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                phone,
                name,
                email,
            });
            for (let i = 0; i < orderItems.length; i++) {
                const findProduct = await Product.findById(orderItems[i].product);
                const optionColor = findProduct?.optionColor;
                const findColor = optionColor.find((option) => option.color == orderItems[i].color);
                const filterOptionColor = optionColor.filter((option) => option.color != orderItems[i].color);
                if (findColor) {
                    findColor.color = findColor.color;
                    findColor.countInStock = findColor.countInStock - orderItems[i].qty;
                }
                let arrOption = [...filterOptionColor, findColor];
                await Product.findOneAndUpdate({ _id: orderItems[i].product }, { optionColor: arrOption });
            }
            const createOrder = await order.save();
            res.status(201).json(createOrder);
        }
    }),
);

//UPDATE AMOUNT PRODUCT
orderRouter.put(
    '/returnAmountProduct',
    protect,
    asyncHandler(async (req, res) => {
        const { orderItems } = req.body;
        if (orderItems) {
            for (let i = 0; i < orderItems.length; i++) {
                const findProduct = await Product.findById(orderItems[i].product);
                const optionColor = findProduct?.optionColor;
                const findColor = optionColor.find((option) => option.color == orderItems[i].color);
                const filterOptionColor = optionColor.filter((option) => option.color != orderItems[i].color);
                if (findColor) {
                    findColor.color = findColor.color;
                    findColor.countInStock = findColor.countInStock + orderItems[i].qty;
                }
                let arrOption = [...filterOptionColor, findColor];
                await Product.findOneAndUpdate({ _id: orderItems[i].product }, { optionColor: arrOption });
            }
            res.status(201).json('success');
        }
    }),
);

//CREATE PRODUCT
orderRouter.post(
    '/:id/poductReview',
    protect,
    asyncHandler(async (req, res) => {
        const { orderItemId, rating, comment, name } = req.body;
        const orders = await Order.find({ user: req.user._id });
        const order = orders.find((order) => order.id == req.params.id);
        const findItemProduct = order?.orderItems.find((item) => item._id == orderItemId);
        if (findItemProduct?.productReview.length > 0) {
            res.status(400);
            throw new Error('Bạn đã đánh giá rồi');
        }
        if (rating == '' || comment == '') {
            res.status(400);
            throw new Error('Nhập đầy đủ thông tin');
        }
        if (findItemProduct) {
            const newReview = {
                userName: name,
                rating,
                comment,
            };
            findItemProduct.productReview.push(newReview);
            await order.save();
            res.status(201).json(findItemProduct);
        }
    }),
);

// GET ALL ORDERS
orderRouter.get(
    '/productbestseller',
    //protect,
    asyncHandler(async (req, res) => {
        const orders = await Order.find({});
        const products = await Product.find({}).sort({ _id: -1 });
        let allPay = [];
        let AllOrder = [];
        let Arr = {};
        let ArrQuatity = [];
        for (let order of orders) {
            if (order.isPaid == true) {
                allPay.push(order);
            }
        }
        for (let pay of allPay) {
            for (let paid of pay.orderItems) {
                AllOrder.push(paid);
            }
        }
        for (let i = 0; i < AllOrder.length; i++) {
            if (Arr[AllOrder[i].product] != undefined) Arr[AllOrder[i].product]++;
            else Arr[AllOrder[i].product] = 1;
        }
        let newarr = [];
        ArrQuatity = Object.entries(Arr).sort(function (a, b) {
            return b[1] - a[1];
        });
        for (let i = 0; i < ArrQuatity.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (ArrQuatity[i][0] == products[j]._id) {
                    newarr.push(products[j]);
                    break;
                }
            }
        }
        res.json(newarr);
    }),
);

// ADMIN GET ALL ORDERS
orderRouter.get(
    '/all',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const pageSize = 15;
        const page = Number(req.query.pageNumber) || 1;
        const status = Number(req.query.status) || 0;

        let search = {};
        if (req.query.keyword) {
            search.email = {
                $regex: req.query.keyword,
                $options: 'i',
            };
        }

        if (req.query.date1 && req.query.date2) {
            search.createdAt = { $gte: req.query.date1, $lt: req.query.date2 };
        }
        if (status == 0) {
            search.cancel = 0;
        }
        if (status == 1) {
            search.waitConfirmation = false;
            search.cancel = 0;
        }
        if (status == 2) {
            search.cancel = 0;
            search.waitConfirmation = true;
            search.isDelivered = false;
        }
        if (status == 3) {
            search.cancel = 0;
            search.isDelivered = true;
            search.errorPaid = false;
            search.isPaid = false;
        }
        if (status == 4) {
            search.cancel = 0;
            search.isPaid = true;
            search.completeAdmin = false;
        }
        if (status == 5) {
            search.cancel = 0;
            search.completeUser = true;
            search.completeAdmin = true;
        }
        if (status == 6) {
            search.cancel = 1;
        }
        if (status == 7) {
            search.cancel = 0;
            search.errorPaid = true;
        }
        const count = await Order.countDocuments({ ...search });
        let orders = await Order.find({ ...search })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ _id: -1 })
            .populate('user', 'id name email')
            .populate('userNv', 'id name email');

        res.json({ orders, page, pages: Math.ceil(count / pageSize) });
    }),
);

// NHAN VIEN GET ALL ORDERS
orderRouter.get(
    '/all/orders',
    protect,
    asyncHandler(async (req, res) => {
        const pageSize = 15;
        const page = Number(req.query.pageNumber) || 1;
        const status = Number(req.query.status) || 2;

        let search = {};
        if (req.query.keyword) {
            search.email = {
                $regex: req.query.keyword,
                $options: 'i',
            };
        }
        if (status == 2) {
            search.cancel = 0;
            search.waitConfirmation = true;
            search.isDelivered = false;
        }
        const count = await Order.countDocuments({ ...search });
        let orders = await Order.find({ ...search })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ _id: -1 })
            .populate('user', 'id name email');

        res.json({ orders, page, pages: Math.ceil(count / pageSize) });
    }),
);

orderRouter.get(
    '/complete',
    // protect,
    // admin,
    asyncHandler(async (req, res) => {
        const orders = await Order.find({ completeAdmin: true }).sort({ _id: -1 });
        if (orders) {
            res.json(orders);
        }
    }),
);

// USER GET ORDERS ITEMS
orderRouter.get(
    '/:id/orderItem',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            const orderItems = order?.orderItems;
            res.json(orderItems);
        }
    }),
);

// USER LOGIN ORDERS
orderRouter.get(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
        res.json(order);
    }),
);

// GET ORDER BY ID
orderRouter.get(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// GET ORDER BY ID DETAIL
orderRouter.get(
    '/:id/detail',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS PAID
orderRouter.put(
    '/:id/pay',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            // order.orderItems.map((orderItem)=>{
            // const product = await Product.findById(orderItem.product);
            // if(product){
            //     product.numberOfOrder += orderItem.qty;
            //     const updatedProduct = await Product.save();}
            // })
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS WAITCONFIRMATION
orderRouter.put(
    '/:id/waitConfirmation',
    protect,
    // admin,
    asyncHandler(async (req, res) => {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            if (status) {
                order.waitConfirmation = true;
                order.waitConfirmationAt = Date.now();
            } else {
                order.waitConfirmation = false;
                order.waitConfirmationAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS COMMPLETE USER
orderRouter.put(
    '/:id/completeUser',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.completeUser = true;
            order.completeUserAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS COMMPLETE ADMIN
orderRouter.put(
    '/:id/completeAdmin',
    protect,
    // admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.completeAdmin = true;
            order.completeAdminAt = Date.now();
            order.completeUser = true;
            order.completeUserAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ORDER IS DELIVERED
orderRouter.put(
    '/:id/delivered',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            if (!order.isDelivered) {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
                order.userNv = req.user._id;

                const createOrder = new OrderNv({
                    orderItems: order.orderItems,
                    userKh: order.user._id,
                    userNv: req.user._id,
                    shippingAddress: order.shippingAddress,
                    paymentMethod: order.paymentMethod,
                    taxPrice: order.taxPrice,
                    shippingPrice: order.shippingPrice,
                    totalPrice: order.totalPrice,
                    phone: order.phone,
                    name: order.name,
                    email: order.email,
                    isDelivered: true,
                    deliveredAt: Date.now(),
                    idOrder: order._id,
                });

                const retult = await createOrder.save();
                const updatedOrder = await order.save();
                res.json(updatedOrder);
            } else {
                res.status(404);
                throw new Error('Đơn hàng này đã được một nhân viên khác nhận');
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// DELIVERED CONFRIM BY ADMIN
orderRouter.put(
    '/:id/deliveredAdmin',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// PAYS CONFIRM BY AMINDIN
orderRouter.put(
    '/:id/paidAdmin',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.errorPaid = false;
            order.errorPaidAt = Date.now();
            order.content = '';

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('không tìm thấy đơn hàng');
        }
    }),
);

// PAYS CONFIRM BY NHANVIEN
orderRouter.put(
    '/:id/paid',
    protect,
    asyncHandler(async (req, res) => {
        const orderNv = await OrderNv.findById(req.params.id);

        if (orderNv) {
            const order = await Order.findOne({ _id: orderNv.idOrder });
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.errorPaid = false;
                order.errorPaidAt = Date.now();
                order.content = '';
                orderNv.isPaid = true;
                orderNv.paidAt = Date.now();
                orderNv.errorPaid = false;
                orderNv.errorPaidAt = Date.now();
                orderNv.content = '';

                const updateOrderNv = await orderNv.save();
                const updatedOrder = await order.save();
                res.json(updatedOrder);
            } else {
                res.status(404);
                throw new Error('không tìm thấy đơn hàng');
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

//ERROR PAID CONFRIM BY AMIDN
orderRouter.put(
    '/:id/errorPaidAdmin',
    protect,
    asyncHandler(async (req, res) => {
        const errorOrder = await Order.findById(req.params.id);
        if (!errorOrder.isPaid) {
            errorOrder.errorPaid = true;
            errorOrder.errorPaidAt = Date.now();

            const updatedOrder = await errorOrder.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Trạng thái đã thanh toán nên sẽ không thực hiên được chức năng này');
        }
    }),
);

// UPDATE ERROR PAID
orderRouter.put(
    '/:id/errorPaid',
    protect,
    asyncHandler(async (req, res) => {
        const errorOrderNv = await OrderNv.findById(req.params.id);

        if (errorOrderNv) {
            const errorOrder = await Order.findOne({ _id: errorOrderNv.idOrder });
            if (!errorOrder.isPaid) {
                errorOrder.errorPaid = true;
                errorOrder.errorPaidAt = Date.now();
                errorOrderNv.errorPaid = true;
                errorOrderNv.errorPaidAt = Date.now();

                const updateOrderNv = await errorOrderNv.save();
                const updatedOrder = await errorOrder.save();
                res.json(updatedOrder);
            } else {
                res.status(404);
                throw new Error('Trạng thái đã thanh toán nên sẽ không thực hiên được chức năng này');
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// ERROR CONTENT CONFRIM BY ADMIN
orderRouter.put(
    '/:id/contentErrorPaidAdmin',
    protect,
    asyncHandler(async (req, res) => {
        const errorContent = await Order.findById(req.params.id);

        if (errorContent.errorPaid) {
            errorContent.content = req.body.content;
            const updatedOrder = await errorContent.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Phải đổi trang thái thanh toán không thanh công trước khi gửi');
        }
    }),
);

// ERROR CONTENT
orderRouter.put(
    '/:id/contentErrorPaid',
    protect,
    asyncHandler(async (req, res) => {
        const errorContentNv = await OrderNv.findById(req.params.id);

        if (errorContentNv) {
            const errorContent = await Order.findOne({ _id: errorContentNv.idOrder });
            if (errorContent.errorPaid) {
                errorContent.content = req.body.content;
                errorContentNv.content = req.body.content;

                const updateOrderNv = await errorContentNv.save();
                const updatedOrder = await errorContent.save();
                res.json(updatedOrder);
            } else {
                res.status(404);
                throw new Error('Phải đổi trang thái thanh toán không thanh công trước khi gửi');
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// UPDATE GUARANGEE
orderRouter.put(
    '/:id/guarantee',
    protect,
    asyncHandler(async (req, res) => {
        const orderGuarantee = await Order.findById(req.params.id);

        if (orderGuarantee) {
            orderGuarantee.isGuarantee = true;
            orderGuarantee.isGuaranteeAt = Date.now();

            const updatedOrder = await orderGuarantee.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

// UPDATE NOTE GUARANTEE
orderRouter.put(
    '/:id/noteGuarantee',
    protect,
    asyncHandler(async (req, res) => {
        const orderNoteGuarantee = await Order.findById(req.params.id);

        if (orderNoteGuarantee) {
            orderNoteGuarantee.noteGuarantee = req.body.note;

            const updatedOrder = await orderNoteGuarantee.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

orderRouter.delete(
    '/:id/cancel',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            if (order.isPaid != true) {
                order.cancel = 1;
                const updatedOrder = await order.save();
                res.json(updatedOrder);
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);

orderRouter.delete(
    '/:id/ucancel',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (req?.user?.disabled) {
            res.status(400);
            throw new Error('account look up');
        }
        if (order != undefined || req.user._id == order.user) {
            if (order.isDelivered != true) {
                order.cancel = 1;
                const updatedOrder = await order.save();
                res.json(updatedOrder);
            } else {
                res.status(404);
                throw new Error('Can not cancel');
            }
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    }),
);
orderRouter.get(
    '/:id/address',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.find({ user: req.params.id });

        if (order) {
            res.json(order[order.length - 1].shippingAddress);
        } else {
            res.status(404);
            throw new Error('Not found order of user');
        }
    }),
);

export default orderRouter;
