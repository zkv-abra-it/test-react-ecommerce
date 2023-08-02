import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '@context/AuthContext/AuthContext';
import { createOrder } from '@services/ApiService';
import { CartApiContext } from '@context/CartApiContext/CartApiContext'
import { getNewOrderSchema } from '@utils/Normalize';
import CheckoutForm from '@components/CheckoutForm/CheckoutForm';
import AddressForm from '@components/CheckoutForm/AddressForm';

export default function CheckoutAuth() {
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);
    const { cartItems, emptyCart } = useContext(CartApiContext);
    const [newAddress, setNewAddress] = useState({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        country: '',
        region: '',
        street: '',
        city: '',
        zip: ''
    });
    const [isNewAddress, setIsNewAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewAddress((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const selectAddress = (e) => {
        setIsNewAddress(false);
        setSelectedAddress(e.target.value);
    }

    const toggleIsNewAddress = () => {
        setIsNewAddress((prev) => !prev);
        setSelectedAddress(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        createOrder(
            getNewOrderSchema({
                billingAddress: isNewAddress ? newAddress : { id: selectedAddress },
                shippingAddress: isNewAddress ? newAddress : { id: selectedAddress },
                items: cartItems
            })
        ).then(() => {
            emptyCart();
            navigate('/', { replace: true });
        });
    }

    return (
        <CheckoutForm handleSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <div className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </div>
                            <div className="mt-2">
                                {userInfo.firstName}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                {userInfo.lastName}
                            </div>
                        </div>

                        <div className="col-span-full ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                {userInfo.email}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Billing / Shipping</h2>

                    <div className="grid w-full gap-6 md:grid-cols-2">
                        {userInfo.addresses.map((address) => (
                            <div className="col-span-1">
                                <input onChange={(e) => selectAddress(e)} type="radio" id={`address-${address.id}`} name="address" value={address.id} className="hidden peer" required />
                                <label htmlFor={`address-${address.id}`} className="inline-flex h-full w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blur-700 peer-checked:border-zinc-700 peer-checked:text-zinc-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">{address.attributes.label}</div>
                                        <p>{address.attributes.city}</p>
                                        <p>{address.attributes.street}</p>
                                    </div>
                                </label>
                            </div>
                        ))}

                        <div className="col-span-1 flex flex-col">
                            <input onChange={toggleIsNewAddress} type="radio" id="new-address" name="address" value="" className="hidden peer" required />
                            <label htmlFor="new-address" className="inline-flex items-center justify-between h-full w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blur-700 peer-checked:border-zinc-700 peer-checked:text-zinc-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="w-full text-lg font-semibold">Create new address</div>
                                <svg className="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </label>
                        </div>
                    </div>

                    {
                        isNewAddress &&
                        <AddressForm
                            formData={newAddress}
                            handleChange={handleChange}
                            setFormData={setNewAddress}
                        />
                    }
                </div>
            </div>
        </CheckoutForm>

    )
}