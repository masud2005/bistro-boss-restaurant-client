import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
// import axios from 'axios';

const ProductCard = ({ item }) => {
    const { category, image, name, price, recipe, _id } = item;
    const { user } = useAuth();
    // console.log(user);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = (food) => {
        if (user && user?.email) {
            console.log('Login user');
            // Send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(result => {
                    // console.log('Added', result.data);
                    if (result.data.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: "Successfully added.",
                            text: `${name} added to your cart.`,
                            timer: 3000,
                            customClass: {
                                confirmButton: 'bg-teal-400 text-white'
                            }
                        })
                        refetch();
                    }
                })
                .catch(error => {
                    // console.log(error.code);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to add to cart',
                        text: 'An error occurred while adding the item to your cart. Please try again later.',
                        timer: 3000,
                        customClass: {
                            confirmButton: 'bg-red-400 text-white'
                        }
                    })
                })
        }
        else {
            // console.log('Not Login');
            // 
            Swal.fire({
                title: "You are not Logged In!",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Send the user to the login page
                    navigate('/sign-in');
                }
            });
        }
    }

    return (
        <div className=" bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img
                className="w-full h-48 object-cover"
                src={image}
                alt="Caesar Salad"
            />
            <div className="p-4">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                    {name}
                </h5>
                <p className="mt-2 text-gray-600">
                    {recipe}
                </p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">${price}</span>
                    <button onClick={() => handleAddToCart(item)} className="px-4 py-2 bg-gray-200 text-yellow-600 border-b-[3px] border-yellow-600 rounded-lg text-sm font-medium shadow hover:bg-gray-700 ">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
