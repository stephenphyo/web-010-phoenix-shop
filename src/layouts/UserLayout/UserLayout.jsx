import React from 'react';

/*** CSS Imports ***/
import './UserLayout.css';

/*** Router Imports ***/
import { Outlet } from 'react-router-dom';

function UserLayout() {
    return (
        <section className='user_layout'>
            <div className='row'>
                <div className='user_layout_sidebar col-12 col-lg-3'>
                    Sidebar
                </div>
                <div className='user_layout_main col-12 col-lg-8'>
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default UserLayout;