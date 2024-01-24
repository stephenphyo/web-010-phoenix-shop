import { Outlet } from 'react-router-dom';

/*** CSS Imports ***/
import './MainLayout.css';

/***  Component Imports ***/
import Header from 'components/Header/Header';

function MainLayout() {
    return (
        <>
            <section className='app_header'>
                <Header />
            </section>
            <section className='app_body'>
                <div className='app_main'>
                    <Outlet />
                </div>
            </section>
        </>
    );
}

export default MainLayout;