import React, {useState} from 'react';
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa';
import {useSelector , useDispatch} from 'react-redux'
import {login} from '../features/auth/authSlice.js'

function Login() {

    const [formData , setFormData] = useState({
        email : '',
        password : '',
    });

    const {email , password } = formData;

    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, message} = useSelector(state => state.auth);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }) )
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        };

        dispatch(login(userData));
    }

    return (
        <>
            <section className="heading">
                <FaSignInAlt /> Login
                <p>Please log in to your account to get Support</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    
                    <div className="form-group">
                        <input type="text" className='form-control' id='email' name='email' placeholder='Enter your email' onChange={onChange} value={email} required />
                    </div>
                    <div className="form-group">
                        <input type="password" className='form-control' id='password' name='password' placeholder='Enter password' onChange={onChange} value={password} required />
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-block">
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login