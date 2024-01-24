import { Outlet } from 'react-router-dom';

/*** CSS Imports ***/
import './FormLayout.css';

function CenteredLayout() {

    return (
        <section className='form_layout'>
            <div className='form_layout_container'>
                <Outlet />
            </div>
        </section>
    );
}

export default CenteredLayout;