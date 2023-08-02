import React, { useState, useContext, useEffect } from 'react'
import { createOrder } from '@services/ApiService';
import { useNavigate } from "react-router-dom";
import { CartApiContext } from '@context/CartApiContext/CartApiContext'
import { AuthContext } from '@context/AuthContext/AuthContext';
import AddressForm from '@components/CheckoutForm/AddressForm';
import CheckoutForm from '@components/CheckoutForm/CheckoutForm';


export default function CheckoutGuest() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        region: '',
        street: '',
        city: '',
        zip: ''
    });
    const navigate = useNavigate();
    const { cartItems, emptyCart } = useContext(CartApiContext);
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        if (Object.keys(userInfo).length !== 0) {
            setFormData((prev) => ({ ...prev, email: userInfo.email, 'first_name': userInfo.firstName, 'last_name': userInfo.lastName }))
        }
    }, [userInfo])

    function getOrderAddressesInfo(id) {
        return {
            "type": "orderaddresses",
            "id": id,
            "attributes": {
                "street": formData.street,
                "city": formData.city,
                "postalCode": formData.zip,
                "firstName": formData.first_name,
                "lastName": formData.last_name
            },
            "relationships": {
                "country": {
                    "data": {
                        "type": "countries",
                        "id": formData.country
                    }
                },
                "region": {
                    "data": {
                        "type": "regions",
                        "id": formData.region
                    }
                }
            }
        }
    }

    function getCustomerInfo() {
        return {
            "type": "customerusers",
            "id": "guest1",
            "attributes": {
                "email": formData.email,
                "firstName": formData.first_name,
                "lastName": formData.last_name
            }
        }
    }

    function getLineItemsIds() {
        return cartItems.map((item, i) => ({
            "type": "orderlineitems",
            "id": `item${i + 1}`
        }))
    }

    function getLineItems() {
        return cartItems.map((item, i) => ({
            "type": "orderlineitems",
            "id": `item${i + 1}`,
            "attributes": {
                "quantity": item.attributes.quantity
            },
            "relationships": {
                "product": {
                    "data": {
                        "type": "products",
                        "id": item.relationships.product.data.id
                    }
                },
                "productUnit": {
                    "data": {
                        "type": "productunits",
                        "id": item.relationships.unit.data.id
                    }
                }
            }
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createOrder({
            "data": {
                "type": "orders",
                "relationships": {
                    "customerUser": {
                        "data": {
                            "type": "customerusers",
                            "id": "guest1"
                        }
                    },
                    "billingAddress": {
                        "data": {
                            "type": "orderaddresses",
                            "id": "billing1"
                        }
                    },
                    "shippingAddress": {
                        "data": {
                            "type": "orderaddresses",
                            "id": "shipping1"
                        }
                    },
                    "lineItems": {
                        "data": getLineItemsIds()
                    }
                }
            },
            "included": [
                getCustomerInfo(),
                getOrderAddressesInfo('billing1'),
                getOrderAddressesInfo('shipping1'),
                ...getLineItems()
            ]
        }).then(() => {
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
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    value={formData.first_name}
                                    type="text"
                                    name="first_name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    required
                                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    value={formData.last_name}
                                    type="text"
                                    name="last_name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    required
                                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full ">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => handleChange(e)}
                                    value={formData.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Billing / Shipping</h2>

                    <AddressForm
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                    />
                </div>
            </div>
        </CheckoutForm>


    )
}