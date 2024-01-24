import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './Login.css';

/*** Redux Imports ***/
import { useLoginMutation } from 'redux-app/apis/AuthAPI';

/*** Component Imports ***/
import Metadata from 'components/Metadata/Metadata';
import FormInputText from 'components/Form/FormInputText/FormInputText';
import FormInputPassword from 'components/Form/FormInputPassword/FormInputPassword';
import FormButton from 'components/Form/FormButton/FormButton';

/*** Hook Imports ***/
import useAxios from 'hooks/useAxios';

/*** Package Imports ***/
import { Bars } from 'react-loader-spinner';

function Login() {

    /* useState */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState({});

    /* Router */
    const navigate = useNavigate();

    /* Redux */
    const [login, { data, error, isLoading }] = useLoginMutation();

    /* Custom Hooks */
    // const { fetch, data, error, isLoading } = useAxios();
    // const { fetch: profileFetch, data: profileData, error: profileError, isLoading: profileIsLoading } = useAxios();

    /* Functions */
    const handleLogin = () => {
        login({
            email: email,
            password: password
        });
    }

    /* useEffect */
    useEffect(() => {
        if (data?.success) navigate('/');
    }, [data]);

    useEffect(() => {
        setFormError({});
        if (error?.status === 404) {
            setFormError({ ...formError, email: error?.data?.message });
        }
        if (error?.status === 401) {
            setFormError({ ...formError, password: error?.data?.message });
        }
    }, [error]);

    // const handleLogin = () => {
    //     fetch('/api/v1/auth/login', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: {
    //             email: email,
    //             password: password
    //         },
    //         withCredentials: true
    //     });
    // }

    // useEffect(() => {
    //     if (data?.status === 200) {
    //         profileFetch('/api/v1/profile/me', { withCredentials: true });
    //     }
    // }, [data]);

    // useEffect(() => {
    //     console.log(profileData);
    // }, [profileData]);

    return (
        <div className='login'>
            <Metadata title='Login' />
            <div className='login_logo'
                onClick={() => navigate('/')}>
                <div className='login_logo_wrapper'>
                    logo
                </div>
            </div>
            <div className='login_header'>
                <span>Phoenix Shop</span>
                <span>Sign in to Account</span>
            </div>
            <div className='login_fields'>
                <FormInputText
                    label='Email'
                    placeholder='Enter Email Address'
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    error={formError?.email} />
                <FormInputPassword
                    label='Password'
                    placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)}
                    error={formError?.password} />
            </div>
            <div className='login_sub'>
                <div id='remember'>
                    <input type='checkbox' />
                    <span>Remember Me</span>
                </div>
                <div id='forgot'
                    onClick={() => navigate('/password/forgot')}>
                    <span>Forgot Password?</span>
                </div>
            </div>
            <FormButton
                text={
                    isLoading
                        ? <Bars visible height='30' width='30'
                            color='#FFFFFF' />
                        : 'Sign In'
                }
                disabled={isLoading ? true : false}
                onClick={() => handleLogin()} />
            <div className='login_footer'>
                <span>New Member?</span>
                <span id='register'
                    onClick={() => navigate('/register')}>
                    Register
                </span>
            </div>
            <div className='login_separator'>
                <hr />
                <div>or</div>
                <hr />
            </div>
            <div className='login_button' id='google'>
                Sign in with Google
            </div>
            <div className='login_button' id='facebook'>
                Sign in with Facebook
            </div>
        </div>
    );
}

export default Login;