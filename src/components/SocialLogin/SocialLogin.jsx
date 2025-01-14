import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleLoginWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // console.log(res.data);
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
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(error => {
                // console.error(error);
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

    return (
        <button onClick={handleLoginWithGoogle} className="btn w-full mt-6 py-2 bg-teal-400 text-base rounded-md hover:bg-teal-500 transition flex items-center justify-center"><FaGoogle /> Login with Google</button>
    );
};

export default SocialLogin;