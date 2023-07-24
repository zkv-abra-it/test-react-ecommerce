import React, {useContext, useEffect, useState} from 'react'
import { ApiContext } from 'src/context/ApiContext/ApiContext';
import ProductCard from '@components/ProductCard/ProductCard'
import Loading from '@components/Loading/Loading';
import Pagination from '@components/Pagination/Pagination';
import SortCatalog from './SortCatalog';
import { getImages, getProducts } from '@components/ApiService/ApiService';

function TestCatalog() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('id');
    const { token } = useContext(ApiContext)
    

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            setProducts([]);

            const productsData = await getProducts(token, {'sort': sort, 'page[size]': 8});

            productsData.data.map(async (product) => {
                const images = await getImages(product.id, token)
                const imageSrc = process.env.REACT_APP_API_URL + '/' + images.data[0].attributes.files[0].url

                setProducts(prev => [...prev, {
                    id: product.id,
                    name: product.attributes.name,
                    price: product.attributes.prices.find(price => price.quantity === "1")?.price,
                    img: imageSrc
                }])

                setIsLoading(false);
            });
        }

        if (token) {
            fetchData()
                .catch((err) => {
                    console.error(err);
                     setIsLoading(false);
                      setIsError(true);
                    });
        }
    }, [token, sort]);

    const handleChangeSort = (newSortValue) => {
        setSort(newSortValue);
    }

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">Something went wrong</div>
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className='flex items-center justify-between'>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                    <SortCatalog currentSort={sort} handleChangeSort={handleChangeSort} />
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    { products.map( (product) => <ProductCard data={product} /> )}
                </div>
            </div>

            <Pagination />
        </div>
    )
}

export default TestCatalog