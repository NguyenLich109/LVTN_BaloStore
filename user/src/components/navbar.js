import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ListCategory } from '../Redux/Actions/categoryActions';
import { listProduct } from '../Redux/Actions/ProductActions';

export default function NavBar({ onRemove }) {
    const dispatch = useDispatch();

    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    useEffect(() => {
        dispatch(ListCategory());
    }, []);
    return (
        <>
            {/* Pc-navbar */}

            <div className="navbar-menu">
                <div className="navbar-list">
                    {categories.map((category) => (
                        <Link to={`/category/${category._id}`}>
                            <button className="navbar-list__li">{category.name}</button>
                        </Link>
                    ))}
                </div>
            </div>
            {/* tablet-mobile modal */}
            <div className="navbar-tablet">
                <div className="modal-tablet"></div>
                <div className="modal-nav">
                    <div className="modal-nav__img">
                        <img src="/images/logo2.png" alt=""></img>
                    </div>
                    <ul className="modal-nav__list">
                        {categories.map((category) => (
                            <Link to={`/category/${category._id}`}>
                                <li className="navbar-list__li" onClick={onRemove}>
                                    {category.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <div className="modal-icon" onClick={onRemove}>
                        <i class="fas fa-times-circle"></i>
                    </div>
                </div>
            </div>
        </>
    );
}
