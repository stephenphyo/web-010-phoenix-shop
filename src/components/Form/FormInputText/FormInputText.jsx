import React, { forwardRef } from 'react';

/*** CSS Imports ***/
import './FormInputText.css';

const FormInputText = forwardRef((props, ref) => {
    return (
        <div className='form_input_text'>
            <label>{props.label}</label>
            <input
                type='text'
                ref={ref}
                {...props} />
            <span className='form_input_error'>
                {props.error ? props.error : ''}
            </span>
        </div>
    );
});

export default FormInputText;