/** @format */

import axiosServices from '../utils/axios';

export const login = async (email, password) => {
	try {
		const response = await axiosServices.post(`/login`, { email, password });
		if (response.status === 200) {
			var serviceToken = response.data.token;
			localStorage.setItem('token', `Bearer ${serviceToken}`);
			axiosServices.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
		}
		return response.data;
	} catch (error) {
		throw new Error('Error logging in: ' + error.message);
	}
};

export const createuser = async (userData) => {
	try {
		const response = await axiosServices.post(`/create-user`, userData);
		return response.data;
	} catch (error) {
		throw new Error('Error creating user profile: ' + error.message);
	}
};

export const updateUserProfile = async (userData) => {
	try {
		const response = await axiosServices.put(`/`, userData);
		if (response.status === 200) {
			var serviceToken = response.data.token;
		}
		localStorage.setItem('token', `Bearer ${serviceToken}`);
		axiosServices.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
		return response.data;
	} catch (error) {
		throw new Error('Error updating user profile: ' + error.message);
	}
};

export const userList = async () => {
	try {
		const response = await axiosServices.get(`/users`);
		return response.data;
	} catch (error) {
		throw new Error('Error updating user profile: ' + error.message);
	}
};
