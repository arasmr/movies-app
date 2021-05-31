import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
    headers: {
        Accept: 'application/json'
    },
    params: {
        'apiKey': process.env.REACT_APP_API_KEY
    }
});

export default request;