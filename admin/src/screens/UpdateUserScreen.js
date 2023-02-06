import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import UpdateFromUser from '../components/users/UpdateFromUser';

export default function UpdateUserScreen({ match }) {
    const { id } = match.params;
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <UpdateFromUser id={id} />
            </main>
        </>
    );
}
