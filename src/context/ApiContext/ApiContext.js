import React, { createContext, useEffect, useState, useRef } from 'react'
import { useCookies } from 'react-cookie'

export const ApiContext = createContext({
    token: '',
    getProducts: () => { },
    getImages: () => { },
    getDefaultShoppingList: () => { },
    getShoppingList: () => { },
    createShoppingList: () => { },
    createShoppingListWithItem: () => { },
    addItemToShoppingList: () => { }
});

export const ApiContextProvider = ({ children }) => {
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])
    const [token, setToken] = useState(cookies.access_token);
    const [refreshToken, setRefreshToken] = useState(cookies.refresh_token);
    const hasFetchedData = useRef(false);

    const storeTokens = (tokenData) => {
        setCookie('access_token', tokenData.access_token, { path: '/', maxAge: tokenData.expires_in})
        setCookie('refresh_token', tokenData.refresh_token, { path: '/', maxAge: 18144000})

        setToken(tokenData.access_token);
        setRefreshToken(tokenData.refresh_token);
    }

    useEffect(() => {
        const getAccessToken = async () => {

            const response = await fetch(process.env.REACT_APP_API_URL + '/oauth2-token', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "grant_type": "password",
                    "client_id": process.env.REACT_APP_OAUTH_CLIENT_ID,
                    "client_secret": process.env.REACT_APP_OAUTH_CLIENT_SECRET,
                    "username": "guest",
                    "password": "guest"
                }),
            });

            const tokenData = await response.json();
            storeTokens(tokenData);
        }

        const refreshAccessToken = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/oauth2-token', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "grant_type": "refresh_token",
                    "client_id": process.env.REACT_APP_OAUTH_CLIENT_ID,
                    "client_secret": process.env.REACT_APP_OAUTH_CLIENT_SECRET,
                    "refresh_token": refreshToken
                }),
            });

            const tokenData = await response.json();
            storeTokens(tokenData);
        }

        if (hasFetchedData.current === false && !cookies.access_token) {
            if (refreshToken) {
                refreshAccessToken()
                    .catch(console.error);
            } else {
                getAccessToken()
                    .catch(console.error);
            }
            
            hasFetchedData.current = true;
        }
        
    }, [cookies.access_token]);

    const getProducts = async (token, params) => {
        const searchParams = new URLSearchParams(params);
          
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/products?' + searchParams.toString(), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/vnd.api+json',
                'X-Include': 'noHateoas;totalCount'
            }
        });
    
        return await response.json();
    }
    
    const getImages = async (id, token, params) => {
        const searchParams = new URLSearchParams(params);
    
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/products/' + id + '/images?' + searchParams.toString(), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/vnd.api+json',
                'X-Include': 'noHateoas;totalCount'
            }
        });
    
        return await response.json();
    }

    const getDefaultShoppingList = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/shoppinglists', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'X-Include': 'noHateoas'
            },
        });
    
        return await response.json();
    }

    const getShoppingList = async (id) => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/shoppinglists/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'X-Include': 'noHateoas'
            },
        });
    
        return await response.json();
    }
    
    const createShoppingList = async (data) => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/shoppinglists', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'X-Include': 'noHateoas'
            },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }
    
    const createShoppingListWithItem = async (data) => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/shoppinglistitems', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'X-Include': 'noHateoas'
            },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }
    
    const addItemToShoppingList = async (cartId, data) => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/shoppinglistitems/' + cartId + '/items', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'X-Include': 'noHateoas'
            },
            body: JSON.stringify(data)
        });
    
        return await response.json();
    }

    return (
        <ApiContext.Provider value={{
            token,
            getProducts,
            getImages,
            getDefaultShoppingList,
            getShoppingList,
            createShoppingList,
            createShoppingListWithItem,
            addItemToShoppingList
          }}>
            {children}
        </ApiContext.Provider>
    );
}