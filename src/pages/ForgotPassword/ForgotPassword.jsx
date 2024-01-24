import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './ForgotPassword.css';

/*** Redux Imports ***/

/*** Component Imports ***/
import Metadata from 'components/Metadata/Metadata';
import FormInputText from 'components/Form/FormInputText/FormInputText';
import FormInputPassword from 'components/Form/FormInputPassword/FormInputPassword';

/*** Hook Imports ***/
import useAxios from 'hooks/useAxios';
import FormButton from 'components/Form/FormButton/FormButton';

/*** Package Imports ***/
import ReCAPTCHA from 'react-google-recaptcha';

/*** Function Imports ***/
import validateEmail from 'functions/validateEmail';

function ForgotPassword() {

    /* useState */
    const [email, setEmail] = useState('');
    const [isHuman, setIsHuman] = useState(null);
    const [formError, setFormError] = useState('');

    /* Router */
    const navigate = useNavigate();

    /* Custom Hooks */
    const { fetch, response, error, isLoading } = useAxios();

    /* Functions */
    const checkEmail = () => {
        if (!email || !validateEmail(email)) {
            setFormError('Invalid Email Address');
            return false;
        }
        return true;
    }

    const handleForgotPassword = () => {
        if (isHuman && checkEmail()) {
            setFormError('');
            const url = '/api/v1/accounts/check';
            const queryParams = {
                email: email
            }
            fetch(`${url}?${new URLSearchParams(queryParams)}`);
        }
    }

    useEffect(() => {
        if (error) {
            setFormError(error?.data?.message);
        }

        if (response?.status == 200) {
            navigate('/password/reset')
        }
    }, [response, error]);

    return (
        <div className='forgotpwd'>
            <Metadata title='Forgot Password' />
            <div className='forgotpwd_header'>
                <span>Phoenix Shop</span>
                <span>Forgot Password?</span>
            </div>
            <div className='forgotpwd_fields'>
                <FormInputText
                    label='Email'
                    placeholder='Enter Email Address'
                    error={formError}
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='forgotpwd_recaptcha'>
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                    onChange={() => setIsHuman(true)}
                    onExpired={() => setIsHuman(null)}
                    theme='dark' />
            </div>
            <FormButton text='Reset Password'
                onClick={() => handleForgotPassword()}
                disabled={isLoading ? true : false} />
        </div>
    );
}

export default ForgotPassword;