import { axios } from "@services/AxiosService";

export const getProducts = async (params) => {
    return await axios.get(process.env.REACT_APP_API_URL + '/api/products', {
        params: params,
        headers: {
            'Accept': 'application/vnd.api+json',
            'X-Include': 'noHateoas;totalCount'
        }
    });
}

export const getProduct = async (id, params) => {
    return await axios.get(process.env.REACT_APP_API_URL + '/api/products/' + id, {
        params: params,
        headers: {
            'Accept': 'application/vnd.api+json',
            'X-Include': 'noHateoas;totalCount'
        }
    });
}
    
export const getProductImages = async (id, params) => {
    return await axios.get(process.env.REACT_APP_API_URL + '/api/products/' + id + '/images', {
        params: params, 
        headers: {
            'Accept': 'application/vnd.api+json',
            'X-Include': 'noHateoas;totalCount'
        }
    });
}

export const getDefaultShoppingList = async () => {
    return await axios.get(process.env.REACT_APP_API_URL + '/api/shoppinglists', {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'X-Include': 'noHateoas'
        },
    });
}

export const getShoppingList = async (id) => {
    return await axios.get(process.env.REACT_APP_API_URL + '/api/shoppinglists/' + id, {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'X-Include': 'noHateoas'
        },
    });
}

export const deleteShoppingList = async (id) => {
    return await axios.delete(process.env.REACT_APP_API_URL + '/api/shoppinglists/' + id, {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
        },
    });
}
    
export const createShoppingList = async (data) => {
    return await axios.post(process.env.REACT_APP_API_URL + '/api/shoppinglists', data, {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'X-Include': 'noHateoas'
        },
    });
}
    
export const createShoppingListWithItem = async (data) => {
    return await axios.post(process.env.REACT_APP_API_URL + '/api/shoppinglistitems', data, {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'X-Include': 'noHateoas'
        }
    });
}
    
export const addItemToShoppingList = async (cartId, data) => {
    return await axios.post(process.env.REACT_APP_API_URL + '/api/shoppinglists/' + cartId + '/items', data, {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'X-Include': 'noHateoas'
        },
    });
}

export const getShoppingListItems = async (cartId) => {
    return await axios.get(process.env.REACT_APP_API_URL + '/api/shoppinglists/' + cartId + '/items', {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'X-Include': 'noHateoas;totalCount'
        },
    });
}

export const deleteItemFromShoppingList = async (id) => {
    return await axios.delete(process.env.REACT_APP_API_URL + '/api/shoppinglistitems/' + id, {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'X-Include': 'noHateoas;totalCount'
        },
    });
}

export const editShoppingListItem = async (id, data) => {
    return await axios.patch(process.env.REACT_APP_API_URL + '/api/shoppinglistitems/' + id, data, {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'X-Include': 'noHateoas'
        },
    });
}