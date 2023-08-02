export const getProductWithImages = ({ products, images}) => {
    return products.map((product) => {
        return {
            id: product.id,
            name: product.attributes.name,
            prices: product.attributes.prices,
            images: images.find(image => image.id === product.id)?.attributes?.files
        }
    });
}

export const getContriesWithRegion = ({countries, regions}) => {
    function getRegions(country) {
        return country.relationships.regions.data.map(({ id }) => {
            const regionCountry = regions.find((regionItem) => regionItem.id === id);

            return {
                id: regionCountry.id,
                name: regionCountry.attributes.name
            }
        });
    }

    return countries.map(itemCountry => (
        {
            id: itemCountry.id,
            name: itemCountry.attributes.name,
            regions: getRegions(itemCountry)
        }
    ));
}

export function getNewOrderSchema (params) {
    const defaultData = {
        customer: false,
        billingAddress: false,
        shippingAddress: false,
        items: []
    }

    const orderData = {...defaultData, ...params};
    const relationships = {};
    const included = [];

    function addBillingAddress() {
        relationships.billingAddress = {
            "data": {
                "type": "orderaddresses",
                "id": "billing1"
            }
        }; 

        included.push('id' in orderData.billingAddress 
            ? getAddress("billing1", orderData.billingAddress)
            : getNewAddress("billing1", orderData.billingAddress)
        )
    }

    function addShippingAddress() {
        relationships.shippingAddress = {
            "data": {
                "type": "orderaddresses",
                "id": "shipping1"
            }
        };

        included.push('id' in orderData.shippingAddress 
            ? getAddress("shipping1", orderData.shippingAddress)
            : getNewAddress("shipping1", orderData.shippingAddress)
        )
    }

    function getNewAddress(relationId, addressData) {
        return {
            "type": "orderaddresses",
            "id": relationId,
            "attributes": {
                "street": addressData.street,
                "city": addressData.city,
                "postalCode": addressData.zip,
                "firstName": addressData.first_name,
                "lastName": addressData.last_name
            },
            "relationships": {
                "country": {
                    "data": {
                        "type": "countries",
                        "id": addressData.country
                    }
                },
                "region": {
                    "data": {
                        "type": "regions",
                        "id": addressData.region
                    }
                }
            }
        }
    }

    function getAddress(relationId, addressData) {
        return {
            "type": "orderaddresses",
            "id": relationId,
            "relationships": {
                "customerUserAddress": {
                    "data": {
                        "type": "customeruseraddresses",
                        "id": addressData.id
                    }
                }
            }
        }
    }

    function addCustomer() {
        relationships.customerUser = {
            "data": {
                "type": "customerusers",
                "id": "guest1"
            }
        };

        included.push( {
            "type": "customerusers",
            "id": "guest1",
            "attributes": {
                "email": orderData.customer.email,
                "firstName": orderData.customer.first_name,
                "lastName": orderData.customer.last_name
            }
        })
    }

    function addItems() {
        relationships.lineItems = {};

        relationships.lineItems.data = orderData.items.map((item, i) => ({
            "type": "orderlineitems",
            "id": `item${i + 1}`
        }));

        included.push(
            ...orderData.items.map((item, i) => ({
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
        )
    }

    function buildSchema() {
        if (orderData.billingAddress) {
            addBillingAddress();
        }

        if (orderData.shippingAddress) {
            addShippingAddress();
        }
        
        if (orderData.customer) {
            addCustomer();
        }

        if (orderData.items.length !== 0) {
            addItems();
        }
    }

    function getResult() {
        buildSchema();

        return {
            "data": {
                "type": "orders",
                "relationships": relationships,
            },
            "included": included
        }
    }

    return getResult();
}