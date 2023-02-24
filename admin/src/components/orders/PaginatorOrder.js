import React from 'react';
import { Link } from 'react-router-dom';

export default function PaginatorOrder(props) {
    const { page, pages, status = '', keyword = '', time1 = '', time2 = '' } = props;
    return (
        pages > 1 && (
            <nav
                className="col-lg-12 col-md-12 "
                aria-label="Page navigation"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <div className="icon-left">
                    <Link
                        to={
                            keyword && status && time1 && time2
                                ? `/orders/search/${keyword}/page/${
                                      page > 1 ? page - 1 : page
                                  }/status/${status}/date1/${time1}/date2/${time2}`
                                : keyword && time1 && time2
                                ? `/orders/page/${
                                      page > 1 ? page - 1 : page
                                  }/search/${keyword}/date1/${time1}/date2/${time2}`
                                : status && time1 && time2
                                ? `/orders/page/${
                                      page > 1 ? page - 1 : page
                                  }/status/${status}/date1/${time1}/date2/${time2}`
                                : keyword && status
                                ? `/orders/search/${keyword}/page/${page > 1 ? page - 1 : page}/status/${status}`
                                : time1 && time2
                                ? `/orders/page/${page > 1 ? page - 1 : page}/date1/${time1}/date2/${time2}`
                                : keyword
                                ? `/orders/page/${page > 1 ? page - 1 : page}/search/${keyword}`
                                : status
                                ? `/orders/page/${page > 1 ? page - 1 : page}/status/${status}`
                                : `/orders/page/${page > 1 ? page - 1 : page}`
                        }
                    >
                        <i class="fas fa-angle-double-left"></i>
                    </Link>
                </div>
                <ul className="pagination justify-content-center" style={{ marginTop: '0', marginBottom: '0' }}>
                    {[...Array(pages).keys()].map((x) => (
                        <li className={`page-item ${x + 1 === page ? 'active' : ''}`} key={x + 1}>
                            <Link
                                className="page-link"
                                to={
                                    keyword && status && time1 && time2
                                        ? `/orders/search/${keyword}/page/${
                                              x + 1
                                          }/status/${status}/date1/${time1}/date2/${time2}`
                                        : keyword && time1 && time2
                                        ? `/orders/page/${x + 1}/search/${keyword}/date1/${time1}/date2/${time2}`
                                        : status && time1 && time2
                                        ? `/orders/page/${x + 1}/status/${status}/date1/${time1}/date2/${time2}`
                                        : keyword && status
                                        ? `/orders/search/${keyword}/page/${x + 1}/status/${status}`
                                        : time1 && time2
                                        ? `/orders/page/${x + 1}/date1/${time1}/date2/${time2}`
                                        : keyword
                                        ? `/orders/page/${x + 1}/search/${keyword}`
                                        : status
                                        ? `/orders/page/${x + 1}/status/${status}`
                                        : `/orders/page/${x + 1}`
                                }
                            >
                                {x + 1}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="icon-right">
                    <Link
                        to={
                            keyword && status && time1 && time2
                                ? `/orders/search/${keyword}/page/${
                                      page < pages ? page + 1 : pages
                                  }/status/${status}/date1/${time1}/date2/${time2}`
                                : keyword && time1 && time2
                                ? `/orders/page/${
                                      page < pages ? page + 1 : pages
                                  }/search/${keyword}/date1/${time1}/date2/${time2}`
                                : status && time1 && time2
                                ? `/orders/page/${
                                      page < pages ? page + 1 : pages
                                  }/status/${status}/date1/${time1}/date2/${time2}`
                                : keyword && status
                                ? `/orders/search/${keyword}/page/${page < pages ? page + 1 : pages}/status/${status}`
                                : time1 && time2
                                ? `/orders/page/${page < pages ? page + 1 : pages}/date1/${time1}/date2/${time2}`
                                : keyword
                                ? `/orders/page/${page < pages ? page + 1 : pages}/search/${keyword}`
                                : status
                                ? `/orders/page/${page < pages ? page + 1 : pages}/status/${status}`
                                : `/orders/page/${page < pages ? page + 1 : pages}`
                        }
                    >
                        <i class="fas fa-angle-double-right"></i>
                    </Link>
                </div>
            </nav>
        )
    );
}
