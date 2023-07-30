import React, {useEffect, useState} from 'react'
import Loading from '@components/Loading/Loading';
import Catalog from './Catalog';
import { getProducts } from '@services/ApiService';

export default function CatalogLoader() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState('id');
    
    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            setProducts([]);

            const { data } = await getProducts({'sort': sort, 'page[size]': 8, 'include': 'images', 'fields[products]': 'name,prices,unit,images'});
            const productsData = data.data;
            const images = data.included.filter(item => item.type === 'productimages');

            productsData.map(async (product) => {
                const productImages = images.find(image => image.id === product.id)?.attributes?.files;
                const catalogImage = productImages.find(productImage => productImage.dimension === 'product_original');
                const imageSrc = process.env.REACT_APP_API_URL + '/' + catalogImage.url

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

        fetchData()
            .catch((err) => {
                console.error(err);
                    setIsLoading(false);
                    setIsError(true);
                });
    }, [sort]);

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