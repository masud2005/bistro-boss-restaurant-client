import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser, updateProfileInfo } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                // console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: `Welcome, ${result.user?.displayName || 'User'}! Your account has been created.`,
                    customClass: {
                        confirmButton: 'bg-teal-400 text-white'
                    }
                });
                updateProfileInfo(data.name, data.photo);
                navigate('/');
            })
            .catch(error => {
                // console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.code,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                });
            })
    }

    const handleLoginWithGoogle = () => {

    }

    return (
        <div className="flex items-center justify-center my-10 px-2">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-xl px-5 md:px-8 py-10 border ">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-teal-500 text-transparent bg-clip-text mb-6 p-1">
                    Register Your Account
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <div className="form-control -mb-5">
                        <label className="label text-lg font-medium text-gray-700">Your Name</label>
                        <input type="text" {...register("name", { required: true })} name="name" placeholder="Enter your name" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                        {errors.name && <p className='text-red-600'>Name is required.</p>}
                    </div>

                    {/* Photo URL Field */}
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Photo URL</label>
                        <input type="text" {...register("photo", {required: true})} name="photo" placeholder="Enter your photo URL" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" required />
                        {errors.photo && <p className='text-red-600'>Photo URL is required.</p>}
                    </div>

                    {/* Email Field */}
                    <div className="form-control -mt-5">
                        <label className="label text-lg font-medium text-gray-700">Email Address</label>
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="Enter your email address" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                        {errors.email && <p className='text-red-600'>Email is required.</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="form-control -mt-5 relative">
                            <label className="label text-lg font-medium text-gray-700">Password</label>
                            <input type={`${showPassword ? 'text' : 'password'}`} {...register("password", {
                                required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,18}$/
                            })} name="password" placeholder="Enter your password" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-[10px] text-gray-600 bg-gray-100 rounded-full cursor-pointer p-1"> {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} </span>

                        </div>
                        <div>
                            {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                            {errors.password?.type === ('minLength' || 'maxLength') && <p className='text-red-600'>Password must be between 6 to 18 characters.</p>}
                            {/* {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be between 6 to 18 characters.</p>} */}
                            {errors.password?.type === "pattern" && (
                                <p className='text-red-600'>Password must have one Uppercase and Lowercase, one Number and one Special character. </p>
                            )}
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <label className=" flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="checkbox checkbox-md border-gray-300" />
                        <span className="text-base text-gray-600">Accept Terms & Conditions</span>
                    </label>

                    {/* Register Button */}
                    <div className="form-control -mt-5">
                        <button className="btn w-full py-2 bg-indigo-500 text-white text-base rounded-md hover:bg-indigo-600 transition"> Register </button>
                    </div>
                </form>

                {/* Login with Google */}
                <button onClick={handleLoginWithGoogle} className="btn w-full mt-6 py-2 bg-teal-400 text-base rounded-md hover:bg-teal-500 transition flex items-center justify-center"><FaGoogle /> Login with Google</button>

                {/* Redirect to Login */}
                <p className="text-center text-base font-medium text-gray-600 mt-3">Already registered? Go to{' '}<Link to="/sign-in" className="text-teal-600 hover:underline">Sign In</Link></p>
            </div>
        </div>
    );
};

export default SignUp;