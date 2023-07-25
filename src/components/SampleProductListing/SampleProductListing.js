import React from 'react'
import ProductCard from '@components/SampleProductCard/SampleProductCard'
import { Products } from './products';

export default function SampleProductListing() {
  return (
    <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                { Products.map( (product) => <ProductCard data={product} /> )}
            </div>
        </div>
    </div>
  )
}