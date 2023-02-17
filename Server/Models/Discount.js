import mongoose from 'mongoose';

const discountSchema = mongoose.Schema(
    {
        nameDiscount: {
            type: String,
            require: true,
        },
        priceDiscount: {
            type: Number,
            require: true,
            default: 0,
        },
        timeDiscount: {
            type: Number,
            require: true,
            default: 0,
        },
        date1: {
            type: String,
            require: true,
        },
        date2: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);
const discount = mongoose.model('discount', discountSchema);
export default discount;
