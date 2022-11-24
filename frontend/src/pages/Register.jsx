import React, {useState} from 'react';
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa';
import {useSelector , useDispatch} from 'react-redux'
import {register} from '../features/auth/authSlice.js'

function Register() {

    const [formData , setFormData] = useState({
        name : '',
        email : '',
        password : '',
        password2 : '',
    });

    const {name , email , password , password2} = formData;

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

        if(password !== password2){
            toast.error('Passwords do not match');
        } else{
            const userData = {
                name,
                email,
                password
            };

            dispatch(register(userData));
        }
    }

    return (
        <>
            <section className="heading">
                <FaUser /> Register {user}
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className='form-control' id='name' name='name' placeholder='Enter your name' onChange={onChange} value={name} required />
                    </div>
                    <div className="form-group">
                        <input type="text" className='form-control' id='email' name='email' placeholder='Enter your email' onChange={onChange} value={email} required />
                    </div>
                    <div className="form-group">
                        <input type="password" className='form-control' id='password' name='password' placeholder='Enter password' onChange={onChange} value={password} required />
                    </div>
                    <div className="form-group">
                        <input type="password" className='form-control' id='password2' name='password2' placeholder='Confirm password' onChange={onChange} value={password2} required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register