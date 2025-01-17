import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [cart, refetch] = useCart();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            // console.log('Payment error', error);
            setError(error.message);
        }
        else {
            // console.log('Payment method', paymentMethod);
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            // console.log('confirm error', confirmError);
        }
        else {
            // console.log('Payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    name: user.displayName,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment)
                // console.log('Payment saved', res.data);

                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successfully',
                        text: 'Congratulations! You have successfully payment.',
                        timer: 3000
                    })
                }
            }
        }


    }

    return (

        <div className="bg-white max-w-[992px] mx-auto p-10">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="mx-auto w-full text-center mt-10">
                    <button className="btn px-20 bg-orange-500 text-white font-bold text-lg hover:text-black" type="submit" disabled={!stripe || !clientSecret}>
                        Payment
                    </button>
                </div>
            </form>
            <div className="mt-10">
                <p className="text-red-500">{error}</p>
                {transactionId && <p className="font-semibold"><span className="text-green-600">Your transaction ID:</span> {transactionId}</p>}
            </div>
        </div>
    );
};

export default CheckoutForm;