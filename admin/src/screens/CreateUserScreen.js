import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import FromCreateUser from '../components/users/FromCreateUser';

const CreateUserScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <FromCreateUser />
            </main>
        </>
    );
};

export default CreateUserScreen;
