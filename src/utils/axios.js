/**
 * axios setup to use mock service
 *
 * @format
 */

import axios from 'axios';

const axiosServices = axios.create({ baseURL: process.env.REACT_APP_API_URL });

axiosServices.interceptors.request.use(
	(config) => {
		let token = localStorage.getItem('token');
		config.headers.Authorization = token;
		return config;
	},
	(error) => Promise.reject(error)
);

// interceptor for http
axiosServices.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject((error.response && error.response.data) || 'Wrong Services');
	}
);

export default axiosServices;
