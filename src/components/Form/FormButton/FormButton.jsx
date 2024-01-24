import React, { forwardRef } from 'react';

/*** CSS Imports ***/
import './FormButton.css';

const FormButton = forwardRef((props, ref) => {
    return (
        <div ref={ref}
            className={`form_button ${props.disabled ? 'disabled' : ''}`}
            {...props}>
            {props.text}
        </div>
    );
});

export default FormButton;