import React, { useEffect, useState, useContext } from 'react'
import { createOrder, getCountriesWithRegions } from '@services/ApiService';
import { useNavigate } from "react-router-dom";
import { CartApiContext } from '@context/CartApiContext/CartApiContext'

function OrderCreatorForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        country: 'US',
        region: 'US-NY',
        street: '',
        city: '',
        zip: ''
    });
    const navigate = useNavigate();
    const { cartItems } = useContext(CartApiContext);

    // useEffect(() => {
    //     getCountriesWithRegions({ 'filter[id]': 'US,IL', 'include': 'regions' })
    //         .then(({ data }) => {
    //             const countries = data.data;
    //             const regions = data.included
    //         })
    // }, [])

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
                "email": formData.email
            }
        }
    }

    function getCartItems() {
        return cartItems.map((item, i) => ({
            "type": "orderlineitems",
            "id": `item${i}`,
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

    const handleSubmit = () => {
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
                        "data": [
                            {
                                "type": "orderlineitems",
                                "id": "item1"
                            }
                        ]
                    }
                }
            },
            "included": [
                getCustomerInfo(),
                getOrderAddressesInfo('billing1'),
                getOrderAddressesInfo('shipping1'),
                ...getCartItems()
            ]
        });
    }

    return (
        <div className="bg-gray-100 py-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Create order</h1>

            <div className="mx-auto max-w-3xl justify-center px-6">
                <form>
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

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Country
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            required
                                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>United States</option>
                                            <option>Israel</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Region
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="region"
                                            name="region"
                                            autoComplete="region-name"
                                            required
                                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>United States</option>
                                            <option>Israel</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => handleChange(e)}
                                            value={formData.street}
                                            type="text"
                                            name="street-address"
                                            id="street-address"
                                            autoComplete="street-address"
                                            required
                                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => handleChange(e)}
                                            value={formData.city}
                                            type="text"
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            required
                                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => handleChange(e)}
                                            value={formData.zip}
                                            type="text"
                                            name="postal-code"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            required
                                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button onClick={() => navigate(-1)} type="button" className="text-sm outline-none font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="outline-none rounded-md bg-zinc-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default OrderCreatorForm