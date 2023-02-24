import express, { json } from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../Middleware/AuthMiddleware.js';
import discount from '../Models/Discount.js';
import User from './../Models/UserModel.js';

const discountRoutes = express.Router();

//CREATE DISCOUNT
discountRoutes.post(
    '/create',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { nameDiscount, priceDiscount, countInStock, timeDiscount, date1, date2 } = req.body;
        const findName = await discount.findOne({ nameDiscount });
        if (!findName) {
            const createDiscount = new discount({
                nameDiscount,
                priceDiscount,
                countInStock,
                timeDiscount,
                date1,
                date2,
            });
            if (createDiscount) {
                await createDiscount.save();
                res.status(201).json(createDiscount);
            }
        } else {
            res.status(404);
            throw new Error('Mã giảm giá này đã tồn tại vui lòng đổi tên khác');
        }
    }),
);

//DETELE DISCOUNT
discountRoutes.post(
    '/:id/delete',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const findDiscount = await discount.findById(req.params.id);

        if (findDiscount) {
            const saveDiscount = await findDiscount.remove();
            if (saveDiscount) {
                const getAllUser = await User.find({ isAdmin: false, isNv: false });
                if (getAllUser) {
                    getAllUser.forEach(async (user) => {
                        let filterDiscount = user.discount.filter((discount) => findDiscount.nameDiscount != discount);
                        user.discount = filterDiscount;
                        await User.updateOne({ _id: user._id }, { $set: { discount: user.discount } });
                    });
                }
                res.status(201).json(saveDiscount);
            }
        } else {
            res.status(404);
            throw new Error('Mã này không tồn tại vui lòng kiểm tra lại');
        }
    }),
);

//UPDATE DISCOUNT
discountRoutes.put(
    '/:id/update',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { nameDiscount, priceDiscount, countInStock, timeDiscount, date1, date2 } = req.body;
        const findDiscount = await discount.findById(req.params.id);

        if (findDiscount) {
            if (nameDiscount || timeDiscount) {
                const getAllUser = await User.find({ isAdmin: false, isNv: false });
                if (getAllUser) {
                    getAllUser.forEach(async (user) => {
                        let filterDiscount = user.discount.filter((discount) => findDiscount.nameDiscount != discount);
                        user.discount = filterDiscount;
                        await User.updateOne({ _id: user._id }, { $set: { discount: user.discount } });
                    });
                }
            }

            findDiscount.nameDiscount = nameDiscount || findDiscount.nameDiscount;
            findDiscount.priceDiscount = priceDiscount || findDiscount.priceDiscount;
            findDiscount.countInStock = countInStock || findDiscount.countInStock;
            findDiscount.timeDiscount = timeDiscount || findDiscount.timeDiscount;
            findDiscount.date1 = date1 || findDiscount.date1;
            findDiscount.date2 = date2 || findDiscount.date2;

            const saveDiscount = await findDiscount.save();
            if (saveDiscount) {
                res.status(201).json(saveDiscount);
            }
        } else {
            res.status(404);
            throw new Error('Mã này không tồn tại vui lòng kiểm tra lại');
        }
    }),
);

//GET DISCOUNT
discountRoutes.get(
    '/all',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const findDiscount = await discount.find({});
        if (findDiscount) {
            res.status(201).json(findDiscount);
        } else {
            res.status(404);
            throw new Error('Không tìm thấy mã giảm giá');
        }
    }),
);

//CHECK DISCOUNT
discountRoutes.post(
    '/check',
    protect,
    asyncHandler(async (req, res) => {
        const { nameDiscount } = req.body;
        const findDiscount = await discount.findOne({ nameDiscount });
        const findUser = await User.findById(req.user.id);
        if (findDiscount) {
            let time = new Date().getTime();
            if (time <= findDiscount.timeDiscount && findDiscount.countInStock > 0) {
                const check = findUser.discount.find((dis) => dis == nameDiscount);
                if (!check) {
                    findUser.discount.push(nameDiscount);
                    findDiscount.countInStock = findDiscount.countInStock < 1 ? 0 : findDiscount.countInStock - 1;
                    const y = await findDiscount.save();
                    const x = await findUser.save();
                    if (x) {
                        res.status(200).json(findDiscount);
                    }
                } else {
                    res.status(404);
                    throw new Error('Mã này bạn đã sử dụng');
                }
            } else {
                res.status(404);
                throw new Error('Mã này đã hết hạn hoặc số lượng đã hết vui lòng đổi mã khác');
            }
        } else {
            res.status(404);
            throw new Error('Không tìm thấy mã giảm giá');
        }
    }),
);

export default discountRoutes;
