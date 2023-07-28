import { getAccessToken, refreshAccessToken} from "./TokenService";
import axios from "axios";

axios.interceptors.request.use(async config => {
    if (!config.url.includes('Authorization')) {
        if (localStorage.getItem('access_token')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
        } else {
            const {access_token, refresh_token} = await getAccessToken(); 
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
        }
    }
        
    return config
})

axios.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;
        if (localStorage.getItem('refresh_token') && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const response = await refreshAccessToken(localStorage.getItem('refresh_token'));     
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);     
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.access_token;
            return axios(originalRequest);
        }
    }
)

export { axios }