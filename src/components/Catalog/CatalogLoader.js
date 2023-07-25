import React, {useContext, useEffect, useState} from 'react'
import { ApiContext } from 'src/context/ApiContext/ApiContext';
import Loading from '@components/Loading/Loading';
import Catalog from './Catalog';

export default function CatalogLoader() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('id');
    const { token, getImages, getProducts } = useContext(ApiContext)
    
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
                    unit: product.attributes.prices.find(price => price.quantity === "1")?.unit,
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
        <Catalog currentSort={sort} handleChangeSort={handleChangeSort} products={products} />
    )
}