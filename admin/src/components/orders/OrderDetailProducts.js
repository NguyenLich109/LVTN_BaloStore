import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderDetailProducts = (props) => {
    const { order, loading, onNoteGuarantee, onErrorContent } = props;

    const [valueContent, setValueContent] = useState('');
    const [valueNote, setValueNote] = useState('');
    useEffect(() => {
        if (order?.content) {
            setValueContent(order?.content);
        }
        if (order?.noteGuarantee) {
            setValueNote(order?.noteGuarantee);
        }
    }, [order]);

    if (!loading) {
        // Calculate Price
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(0);
        };

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    return (
        <table className="table border table-lg">
            <thead>
                <tr>
                    <th style={{ width: '40%' }}>Sản phẩm</th>
                    <th style={{ width: '15%' }}>Màu sắc</th>
                    <th style={{ width: '15%' }}>Đơn giá</th>
                    <th style={{ width: '15%' }}>Số lượng</th>
                    <th style={{ width: '15%' }} className="text-end">
                        Giá tiền
                    </th>
                </tr>
            </thead>
            <tbody>
                {order.orderItems.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <Link className="itemside" to="#">
                                <div className="left">
                                    <img
                                        src={item?.image}
                                        alt={item.name}
                                        style={{ width: '40px', height: '40px' }}
                                        className="img-xs"
                                    />
                                </div>
                                <div className="info">{item.name}</div>
                            </Link>
                        </td>
                        <td>{item?.color}</td>
                        <td>{item?.price?.toLocaleString('de-DE')}đ </td>
                        <td>{item.qty} </td>
                        <td className="text-end"> {(item.qty * item.price)?.toLocaleString('de-DE')}đ</td>
                    </tr>
                ))}

                <tr>
                    {order?.errorPaid && (
                        <td>
                            <textarea
                                placeholder="Nội dung mà bạn muốn viết"
                                value={valueContent}
                                style={{ color: 'red' }}
                                onChange={(e) => setValueContent(e.target.value)}
                                rows="6"
                                className="form-control"
                            ></textarea>
                            <button className="btn btn-light" onClick={() => onErrorContent(valueContent)}>
                                Gửi
                            </button>
                        </td>
                    )}
                    {order?.isGuarantee && (
                        <td>
                            <textarea
                                placeholder="Nội dung mà bạn muốn viết"
                                value={valueNote}
                                style={{ color: '#856404' }}
                                onChange={(e) => setValueNote(e.target.value)}
                                rows="6"
                                className="form-control"
                            ></textarea>
                            <button className="btn btn-light" onClick={() => onNoteGuarantee(valueNote)}>
                                Gửi
                            </button>
                        </td>
                    )}
                    <td colSpan="6">
                        <article className="float-end">
                            <dl className="dlist">
                                <dt className="fs-6" style={{ fontWeight: '600' }}>
                                    Tổng tiền:
                                </dt>{' '}
                                <dd className="fs-6" style={{ fontWeight: '600' }}>
                                    {Number(order.itemsPrice)?.toLocaleString('de-DE')}đ
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="fs-6" style={{ fontWeight: '600' }}>
                                    Mã giảm giá:
                                </dt>{' '}
                                <dd className="fs-6" style={{ fontWeight: '600' }}>
                                    -{order.discountPrice?.toLocaleString('de-DE')}đ
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="fs-6" style={{ fontWeight: '600' }}>
                                    Phí ship:
                                </dt>{' '}
                                <dd className="fs-6" style={{ fontWeight: '600' }}>
                                    {Number(order.shippingPrice)?.toLocaleString('de-DE')}đ
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="fs-6" style={{ fontWeight: '600' }}>
                                    Thuế:
                                </dt>{' '}
                                <dd className="fs-6" style={{ fontWeight: '600' }}>
                                    {Number(order.taxPrice)?.toLocaleString('de-DE')}đ
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="fs-6" style={{ fontWeight: '600' }}>
                                    Tổng cộng:
                                </dt>
                                <dd className="fs-5" style={{ fontWeight: '600' }}>
                                    {Number(order.totalPrice)?.toLocaleString('de-DE')}đ
                                </dd>
                            </dl>
                            <dl className="dlist">
                                <dt className="text-muted fs-6" style={{ fontWeight: '600' }}>
                                    Trạng thái:
                                </dt>
                                <dd>
                                    {order?.cancel !== 1 ? (
                                        order?.waitConfirmation &&
                                        order?.isDelivered &&
                                        order?.isPaid &&
                                        order?.completeUser &&
                                        order?.completeAdmin &&
                                        order?.isGuarantee ? (
                                            <span className="badge alert-warning">Bảo hành sản phẩm</span>
                                        ) : order?.completeAdmin ? (
                                            <span className="badge rounded-pill alert-success">Hoàn tất</span>
                                        ) : order?.waitConfirmation && order?.isDelivered && order?.isPaid ? (
                                            <span className="badge alert-success">Đã thanh toán</span>
                                        ) : order?.errorPaid && order?.waitConfirmation && order?.isDelivered ? (
                                            <span className="badge alert-danger">Thanh toán không thành công</span>
                                        ) : order?.waitConfirmation && order?.isDelivered ? (
                                            <span className="badge alert-warning">Đang giao</span>
                                        ) : order?.waitConfirmation ? (
                                            <span className="badge alert-warning">Đã xác nhận</span>
                                        ) : (
                                            <span className="badge alert-danger">Chờ xác nhận</span>
                                        )
                                    ) : (
                                        <span className="badge bg-dark">Đơn này đã bị hủy</span>
                                    )}
                                </dd>
                            </dl>
                        </article>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default OrderDetailProducts;
