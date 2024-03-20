/** @format */

import { createContext, useReducer } from 'react';
import { globalReducer } from './reducer';
import { useNavigate } from 'react-router-dom';
import { createProduct, deleteProduct, getFilterProducts, getProducts, getSearchProducts, updateProduct, updateProductAssignment } from '../services/product.service';
import { createuser, login, updateUserProfile, userList } from '../services/user.service';

const initState = {
	userData: localStorage.getItem('userData') ?? undefined,
	isLogedIn: false,
	products: [],
};

export const GlobalContext = createContext(initState);

const GlobalState = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducer, initState);
	const navigate = useNavigate();

	const setUserData = (data) => {
		dispatch({
			type: 'SET_USER_DATA',
			payload: data,
		});
	};

	const productCreate = async (productData) => {
		try {
			const response = await createProduct(productData);
			debugger;
			if (response && response.status === 200) {
				await getProductsData();
				return { success: true, message: 'Product created successfully' };
			} else {
				return { success: false, message: 'Something went wrong' };
			}
		} catch (error) {
			debugger;
			return { success: false, message: error.message };
		}
	};

	const productDelete = async (sku) => {
		try {
			const response = await deleteProduct(sku);
			if (response && response.status === 200) {
				await getProductsData();
				return { success: true, message: 'Product created successfully' };
			} else {
				return { success: false, message: 'Something went wrong' };
			}
		} catch (error) {
			return { success: false, message: 'Something went wrong' };
		}
	};

	const productUpdate = async (productData) => {
		try {
			const response = await updateProduct(productData.SKU, productData);
			if (response && response.status === 200) {
				await getProductsData();
				return { success: true, message: 'Product updated successfully' };
			} else {
				return { success: false, message: 'Something went wrong' };
			}
		} catch (error) {
			return { success: false, message: 'Something went wrong' };
		}
	};

	const productUpdateAssignment = async (sku, assignmentData) => {
		try {
			const response = await updateProductAssignment(sku, assignmentData);
			if (response && response.status === 200) {
				await getProductsData();
				return { success: true, message: 'Product updated successfully' };
			} else {
				return { success: false, message: 'Something went wrong' };
			}
		} catch (error) {
			return { success: false, message: 'Something went wrong' };
		}
	};

	const getProductsData = async () => {
		const response = await getProducts();
		dispatch({
			type: 'SET_PRODUCTS_DATA',
			payload: response.data,
		});
	};

	const getSearchProductsData = async (sku, productName) => {
		const response = await getSearchProducts(productName, sku);
		dispatch({
			type: 'SET_PRODUCTS_DATA',
			payload: response.data,
		});
	};

	const getFilterProductsData = async (source, Category) => {
		const response = await getFilterProducts(source, Category);
		dispatch({
			type: 'SET_PRODUCTS_DATA',
			payload: response.data,
		});
	};

	const userLogout = () => {
		localStorage.clear();
		dispatch({
			type: 'USER_LOGOUT',
			payload: initState,
		});
	};

	const userLogin = async (email, password) => {
		try {
			const response = await login(email, password);
			if (response && response.user) {
				localStorage.setItem('userData', JSON.stringify(response.user));
				setUserData(response.user);
				return { success: true, message: 'logged in successfully' };
			} else {
				return { success: false, message: 'Invalid credentials' };
			}
		} catch (error) {
			return { success: false, message: 'Invalid credentials' };
		}
	};

	const userCreate = async (userData) => {
		try {
			const response = await createuser(userData);
			if (response && response.status === 200) {
				return { success: true, message: 'User created successfully' };
			} else {
				return { success: false, message: 'Something went wrong' };
			}
		} catch (error) {
			return { success: false, message: 'Something went wrong' };
		}
	};

	const userUpdate = async (userData) => {
		try {
			const response = await updateUserProfile(userData);
			if (response && response.status === 200) {
				localStorage.setItem('userData', JSON.stringify(response.user));
				setUserData(response.data);
				return { success: true, message: 'User updated successfully' };
			} else {
				return { success: false, message: 'Something went wrong' };
			}
		} catch (error) {
			return { success: false, message: 'Something went wrong' };
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				userData: state.userData,
				products: state.products,
				setUserData,
				userLogout,
				navigate,
				userLogin,
				userCreate,
				userUpdate,
				getProductsData,
				getSearchProductsData,
				getFilterProductsData,
				productCreate,
				productUpdate,
				productUpdateAssignment,
				productDelete,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalState;
