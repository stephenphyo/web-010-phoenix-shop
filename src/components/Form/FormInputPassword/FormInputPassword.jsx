import React, { forwardRef, useState } from 'react';

/*** CSS Imports ***/
import './FormInputPassword.css';

/*** Icon Imports ***/
import { IoEye, IoEyeOff } from 'react-icons/io5';

const FormInputPassword = forwardRef((props, ref) => {

    /* useState */
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='form_input_password'>
            <label>{props.label}</label>
            <div id='container'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    ref={ref}
                    {...props} />
                <span>
                    {
                        showPassword
                            ? <IoEyeOff size={18} onClick={() => setShowPassword(false)} />
                            : <IoEye size={18} onClick={() => setShowPassword(true)} />
                    }
                </span>
            </div>
            <span className='form_input_error'>
                {props.error}
            </span>
        </div >
    );
});

export default FormInputPassword;