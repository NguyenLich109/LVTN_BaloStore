import { printAction } from '../../Redux/Actions/OrderActions';
import { PRINT_ORDER_RESET } from '../../Redux/Constants/OrderConstants';
import { useSelector, useDispatch } from 'react-redux';
import { memo, useState } from 'react';

export default memo(function ModalOrder() {
    const dispatch = useDispatch();

    const printOrderReducer = useSelector((state) => state.printOrderReducer);
    const { file } = printOrderReducer;

    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [retultdate1, setRetultDate1] = useState('');
    const [retultdate2, setRetultDate2] = useState('');

    const handleDate1 = (data) => {
        let y = `${data}T00:00:00`;
        const date = new Date(y);
        const isoDate = date.toISOString();
        if (isoDate) {
            setDate1(isoDate);
            setRetultDate1(data);
        }
    };
    const handleDate2 = (data) => {
        let x = `${data}T23:59:59`;
        const date = new Date(x);
        const isoDate = date.toISOString();
        if (isoDate) {
            setDate2(isoDate);
            setRetultDate2(data);
        }
    };

    const handleSubmit = () => {
        if (date1 && date2) {
            dispatch(
                printAction({
                    date1,
                    date2,
                }),
            );
            setDate1('');
            setDate2('');
            setRetultDate1('');
            setRetultDate2('');
        }
    };
    const handleClose = () => {
        setDate1('');
        setDate2('');
        setRetultDate1('');
        setRetultDate2('');
    };
    return (
        <>
            <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={handleClose}
            >
                <i className="far fa-print"></i>
            </button>
            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                Xuất file
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-lg-12 col-xl-12">
                                    <h5>Thời gian:</h5>
                                    <div className="d-flex align-items-center">
                                        <input
                                            className="form-control search-date"
                                            style={{ margin: '0 5px' }}
                                            type="date"
                                            value={retultdate1}
                                            onChange={(e) => handleDate1(e.target.value)}
                                        ></input>
                                        <i className="fas fa-long-arrow-alt-right pl-2 pr-2"></i>
                                        <input
                                            className="form-control search-date"
                                            style={{ margin: '0 5px' }}
                                            value={retultdate2}
                                            onChange={(e) => handleDate2(e.target.value)}
                                            type="date"
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={handleClose}
                            >
                                Đóng
                            </button>
                            <button type="button" className="btn btn-success" onClick={handleSubmit}>
                                Print
                            </button>
                            {file && (
                                <a
                                    href={URL.createObjectURL(file)}
                                    download="data.xlsx"
                                    onClick={() => {
                                        dispatch({ type: PRINT_ORDER_RESET });
                                        setDate1('');
                                        setDate2('');
                                        setRetultDate1('');
                                        setRetultDate2('');
                                    }}
                                >
                                    Tải file đã tải về
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
