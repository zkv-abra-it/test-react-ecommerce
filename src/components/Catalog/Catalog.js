import React from 'react'
import Pagination from './Pagination';
import SortCatalog from './SortCatalog';
import ProductCard from '@components/ProductCard/ProductCard'

function Catalog({products, currentSort, handleChangeSort}) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className='flex items-center justify-between'>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                    <SortCatalog currentSort={currentSort} handleChangeSort={handleChangeSort} />
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    { products.map( (product) => <ProductCard key={product.id} data={product} /> )}
                </div>
            </div>

            <Pagination />
        </div>
    )
}

export default Catalog