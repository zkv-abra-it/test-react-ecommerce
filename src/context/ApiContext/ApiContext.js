import React, { createContext, useEffect, useState, useRef } from 'react'
import { useCookies } from 'react-cookie'

export const ApiContext = createContext({
    token: ''
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

    return (
        <ApiContext.Provider value={{
            token
          }}>
            {children}
        </ApiContext.Provider>
    );
}