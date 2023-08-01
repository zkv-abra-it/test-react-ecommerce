export const getAccessToken = async (username, password) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/oauth2-token', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "grant_type": "password",
            "client_id": process.env.REACT_APP_OAUTH_CLIENT_ID,
            "client_secret": process.env.REACT_APP_OAUTH_CLIENT_SECRET,
            "username": username,
            "password": password
        }),
    });

    return await response.json();
}

export const refreshAccessToken = async (refreshToken) => {
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

    return await response.json();
}