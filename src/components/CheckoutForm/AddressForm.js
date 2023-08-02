import React from 'react'
import CountrySelector from './CountrySelector';

export default function AddressForm({ formData, handleChange, setFormData}) {

    return (
        <>
            <CountrySelector country={formData.country} region={formData.region} handleChange={handleChange} setFormData={setFormData} />

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={(e) => handleChange(e)}
                            value={formData.street}
                            type="text"
                            name="street"
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
                            id="address-city"
                            autoComplete="address-city"
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
                            name="zip"
                            id="postal-code"
                            autoComplete="postal-code"
                            required
                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
