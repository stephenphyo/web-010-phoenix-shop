import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './Register.css';

/*** Component Imports ***/
import Metadata from 'components/Metadata/Metadata';
import FormInputText from 'components/Form/FormInputText/FormInputText';
import FormInputPassword from 'components/Form/FormInputPassword/FormInputPassword';
import FormButton from 'components/Form/FormButton/FormButton';

/*** Hook Imports ***/
import useAxios from 'hooks/useAxios';

function Register() {

    /* useState */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');

    /* Router */
    const navigate = useNavigate();

    /* Custom Hooks */
    const { fetch, data, error, isLoading } = useAxios();

    /* Functions */
    const handleRegister = () => {
        fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: email,
                password: password
            },
            withCredentials: true
        });
    };

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <div className='register'>
            <Metadata title='Register' />
            <div className='register_logo'>
                <div className='register_logo_wrapper'>
                    logo
                </div>
            </div>
            <div className='register_header'>
                <span>Phoenix Shop</span>
                <span>Register New Account</span>
            </div>
            <div className='register_fields'>
                <FormInputText
                    label='Email'
                    placeholder='Enter Email Address'
                    onChange={(e) => setEmail(e.target.value)} />
                <FormInputPassword
                    label='Password'
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)} />
                <FormInputPassword
                    label='Confirm Password'
                    placeholder='Enter Confirm Password'
                    onChange={(e) => setCfmPassword(e.target.value)} />
            </div>
            <FormButton text='Register'
                onClick={() => handleRegister()} />
            {/* {isLoading ? 'Creating Account...' : 'Register'} */}
            <div className='register_footer'>
                <span>Already a Member?</span>
                <span id='login'
                    onClick={() => navigate('/login')}>
                    Login
                </span>
            </div>
        </div>
    );
}

export default Register;