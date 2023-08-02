import React, {useEffect, useState} from 'react'
import Loading from '@components/Loading/Loading';
import Listing from '@components/Listing/Listing';
import { getProducts } from '@services/ApiService';
import { getProductWithImages } from 'src/utils/Normalize';

export default function Catalog() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('id');
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            setProducts([]);

            const { data } = await getProducts({'sort': sort, 'page[size]': 8, 'page[number]': page, 'include': 'images', 'fields[products]': 'name,prices,unit,images'});
            const productsData = getProductWithImages({products: data.data, images: data.included.filter(item => item.type === 'productimages')});
            
            productsData.map((product) => {
                const catalogImage = product.images.find(productImage => productImage.dimension === 'product_original');

                setProducts(prev => [...prev, {
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.prices.find(price => price.quantity === "1")?.price).toFixed(2),
                    unit: product.prices.find(price => price.quantity === "1")?.unit,
                    img: process.env.REACT_APP_API_URL + '/' + catalogImage.url
                }])
            });
        }

        fetchData()
            .catch((err) => {
                console.error(err);
                    setIsLoading(false);
                    setIsError(true);
                })
            .finally(() => setIsLoading(false));
    }, [sort, page]);

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
        <Listing currentSort={sort} handleChangeSort={handleChangeSort} products={products} />
    )
}