import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountAction } from '../../Redux/Actions/DiscountActions';
import './index.css';

export default memo(function ModalVolcher(data) {
    const { open, hendleSend, id } = data;
    const dispatch = useDispatch();

    const getDiscountReduce = useSelector((state) => state.getDiscountReduce);
    const { discount } = getDiscountReduce;

    const [gift, setGift] = useState('Mã quà tặng');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        dispatch(getDiscountAction());
    }, [dispatch]);

    return (
        <>
            <span type="button" className="btn btn-light" data-toggle="modal" data-target={open}>
                <i className="fas fa-gift"></i>
            </span>

            <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="exampleModalLabel">
                                <i className="fas fa-gift pr-1"></i>
                                Mã quà tặng
                            </h6>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setGift('Mã quà tặng');
                                    setDate('');
                                    setPrice('');
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="dropdown">
                                <button
                                    className="btn btn-light"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    style={{ width: '100%', textAlign: 'left', backgroundColor: '#f1ecec' }}
                                >
                                    {gift}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {discount?.map((dis) => {
                                        return (
                                            <button
                                                key={dis._id}
                                                className="fix-click__gift"
                                                onClick={() => {
                                                    setGift(dis.nameDiscount);
                                                    setDate(new Date(`${dis.date2}T${dis.date1}:00`).toISOString());
                                                    setPrice(dis.priceDiscount);
                                                }}
                                            >
                                                {dis.nameDiscount} - {dis.priceDiscount.toLocaleString('de-DE')}đ
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => hendleSend({ id, gift, date, price })}
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
