import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignIn = () => {
    const { signInUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const location = useLocation();
    // console.log(location);
    const navigate = useNavigate();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        // console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        // console.log('signIn');
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);
        signInUser(email, password)
            .then(result => {
                // console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Sign In Successful',
                    text: `Welcome, ${result.user?.displayName || 'User'}! You are now Sign in.`,
                    timer: 3000,
                    customClass: {
                        confirmButton: 'bg-teal-400 text-white'
                    }
                })
                navigate(location?.state ? location?.state : '/');
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.code,
                    timer: 3000,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                })
            })
    }

    const handleLoginWithGoogle = () => {

    }

    return (
        <div className="flex items-center justify-center my-10 px-2">
            <div className="bg-white shadow-2xl rounded-lg w-full max-w-md px-5 md:px-8 py-10 border mb-1">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-teal-500 text-transparent bg-clip-text mb-6 p-1">Welcome Back</h1>
                <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Email address</label>
                        <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label text-lg font-medium text-gray-700">Password</label>
                        <input type={`${showPassword ? 'text' : 'password'}`} name="password" placeholder="Enter your password" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-[10px] text-gray-600 bg-gray-100 rounded-full cursor-pointer p-1"> {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} </span>
                    </div>
                    <div className="form-control relative">
                        <LoadCanvasTemplate />
                        <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type here" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" required />
                        {/* <a onClick={handleValidateCaptcha} className='btn mt-5'>Validate</a> */}
                    </div>

                    <button disabled={disabled} className="btn w-full py-2 bg-indigo-500 text-white text-base rounded-lg hover:bg-indigo-600 transition"> Login </button>
                </form>
                <div className="mt-6">
                    {/* <button onClick={handleLoginWithGoogle} className="w-full flex items-center justify-center font-medium py-2 bg-teal-400 text-base rounded-lg hover:bg-teal-500 transition"><FaGoogle /> <span className='ml-2'>Login with Google</span></button> */}
                    <SocialLogin />
                </div>
                <p className="mt-4 text-center text-base text-gray-600">Don’t have an account?<Link to="/sign-up" className="text-teal-600 font-medium hover:underline"> Sign Up Now</Link></p>
            </div>
        </div>
    );
};

export default SignIn;