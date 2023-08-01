import React, { createContext, useState, useEffect } from 'react'
import { getAccessToken, refreshAccessToken } from "@services/TokenService";
import { getCurrentCustomer } from '@services/ApiService';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getUserData()
		.then(() => setIsAuth(true))
		.catch(() => setIsAuth(false))
		.finally(() => setIsLoading(false))
	}, []);

	const logout = () => {
		if (isAuth) {
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");

			setIsAuth(false);
			setUserInfo({});
		}
	};

	const login = async (username, password) => {
		return getAccessToken(username, password).then(({ access_token, refresh_token }) => {
			localStorage.setItem('access_token', access_token);
			localStorage.setItem('refresh_token', refresh_token);
			setIsAuth(true);
			getUserData()
		})
	}

	const getUserData = async () => {
		return getCurrentCustomer({'include': 'addresses'}).then(({ data }) => {
			setUserInfo({ 
				id: data.data.id,
				...data.data.attributes,
				addresses: data.included.filter((item) => item.type === 'customeruseraddresses')
			})
		})
	}

	const contextValue = {
		isLoading,
		isAuth,
		login,
		logout,
		userInfo
	};

	return (
		<AuthContext.Provider
			value={contextValue}
		>
			{children}
		</AuthContext.Provider>
	);
};