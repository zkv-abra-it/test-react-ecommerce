import React from 'react'
import { useNavigate } from "react-router-dom";

export default function CheckoutForm(props) {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 py-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Create order</h1>

            <div className="mx-auto max-w-3xl justify-center px-6">
                <form onSubmit={(e) => props.handleSubmit(e)}>
                    {props.children}

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
