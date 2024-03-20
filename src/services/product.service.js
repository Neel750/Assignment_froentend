/** @format */

import axios from '../utils/axios';

export const createProduct = async (productData) => {
	try {
		const response = await axios.post(`/products`, productData);
		return response.data;
	} catch (error) {
		throw new Error('Error creating product: ' + error.message);
	}
};

// Retrieve a products
export const getProducts = async () => {
	try {
		const response = await axios.get(`/products/`);
		return response.data;
	} catch (error) {
		throw new Error('Error retrieving product: ' + error.message);
	}
};

// Retrieve filtered products
export const getFilterProducts = async (source, category) => {
	let queryString = '';
	if (source && category) {
		queryString = `source=${source}&category=${category}`;
	} else if (source) {
		queryString = `source=${source}`;
	} else {
		queryString = `category=${category}`;
	}
	try {
		const response = await axios.get(`/products/filter?${queryString}`);
		return response.data;
	} catch (error) {
		throw new Error('Error retrieving product: ' + error.message);
	}
};

// Retrieve search products
export const getSearchProducts = async (productName, sku) => {
	let queryString = '';
	if (productName && sku) {
		queryString = `productName=${productName}&sku=${sku}`;
	} else if (productName) {
		queryString = `productName=${productName}`;
	} else {
		queryString = `sku=${sku}`;
	}
	try {
		const response = await axios.get(`/products/search?${queryString}`);
		return response.data;
	} catch (error) {
		throw new Error('Error retrieving product: ' + error.message);
	}
};

// Update a product
export const updateProduct = async (productId, updatedProductData) => {
	try {
		delete updatedProductData.SKU;
		const response = await axios.put(`/products/${productId}`, updatedProductData);
		return response.data;
	} catch (error) {
		throw new Error('Error updating product: ' + error.message);
	}
};

// Update a product assignment
export const updateProductAssignment = async (productId, updatedProductAssignmentData) => {
	try {
		const response = await axios.put(`/products/${productId}/assign`, updatedProductAssignmentData);
		return response.data;
	} catch (error) {
		throw new Error('Error assigning product: ' + error.message);
	}
};

// Delete a product
export const deleteProduct = async (productId) => {
	try {
		const response = await axios.delete(`/products/${productId}`);
		return response.data;
	} catch (error) {
		throw new Error('Error deleting product: ' + error.message);
	}
};
