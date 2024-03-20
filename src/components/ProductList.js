/** @format */

import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ProductForm from './ProductForm';
import ProductGrid from './ProductGrid';
import { GlobalContext } from '../contexts/globalContext';
import { AddCircle } from '@mui/icons-material';
import { userList } from '../services/user.service';

// const products = [
// 	{
// 		image: 'product1.jpg',
// 		name: 'Product 1',
// 		category: 'Category A',
// 		options: ['Option 1', 'Option 2', 'Option 3'],
// 		selectedOption: 'Option 1',
// 	},
// 	{
// 		image: 'product2.jpg',
// 		name: 'Product 2',
// 		category: 'Category B',
// 		options: ['Option 1', 'Option 2', 'Option 3'],
// 		selectedOption: 'Option 1',
// 	},
// 	// Add more products as needed
// ];

function ProductList() {
	const { products, productCreate, getProductsData, productUpdate, productUpdateAssignment, productDelete, getFilterProductsData, userData } = useContext(GlobalContext);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editProduct, setEditProduct] = useState(null);
	const [usersArray, setUsersArray] = useState([]);

	useEffect(() => {
		getProductsData();
	}, []);

	useEffect(() => {
		userList()
			.then((res) => setUsersArray(res.data))
			.catch((err) => {
				setUsersArray([]);
			});
	}, []);

	const handleOpenForm = (product) => {
		setEditProduct(product);
		setIsFormOpen(true);
	};

	const handleCloseForm = () => {
		setEditProduct(null);
		setIsFormOpen(false);
	};

	const handleSubmitForm = async (formData) => {
		// Handle form submission (create or edit product)
		console.log('Form submitted with data:', formData);
		const response = await productCreate(formData);
		if (response.success) {
			alert('Product created!');
			handleCloseForm();
		} else {
			alert(response.message);
		}
	};
	return (
		<div>
			<Button variant="contained" color="primary" onClick={() => handleOpenForm()} style={{ marginBottom: '15px' }}>
				<AddCircle />
			</Button>

			<ProductGrid data={products} role={userData?.role} userid={userData?.userid} updateProduct={productUpdate} productDelete={productDelete} productUpdateAssignment={productUpdateAssignment} getFilterProductsData={getFilterProductsData} />
			<ProductForm open={isFormOpen} onClose={handleCloseForm} onSubmit={handleSubmitForm} initialValues={editProduct} userList={usersArray} />
		</div>
	);
}

export default ProductList;
