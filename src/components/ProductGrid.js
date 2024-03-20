/** @format */

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import ProductForm from './ProductForm';
import { Delete, Edit } from '@mui/icons-material';

const ProductGrid = ({ data, role, userid, updateProduct, productDelete, productUpdateAssignment }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filterCriteria, setFilterCriteria] = useState('all');
	const [sourcefilterCriteria, setSourcefilterCriteria] = useState('');

	const filteredData = data
		.filter((row) => {
			if (filterCriteria === 'all' || filterCriteria === '') {
				return true;
			} else {
				return row.category === filterCriteria;
			}
		})
		.filter((row) => {
			return row?.productName?.toLowerCase().includes(searchQuery?.toLowerCase()) || row?.SKU?.toLowerCase().includes(searchQuery?.toLowerCase());
		})
		.filter((row) => {
			return row?.sourceFrom?.[0]?.['userid']?.toLowerCase().includes(sourcefilterCriteria?.toLowerCase());
		});

	const categoryArr = data.map((item) => item.category).filter((value, index, current_value) => current_value.indexOf(value) === index);

	const sourceArr = [...new Set(data.map((item) => item.sourceFrom[0]['userid']))].map((ele) => {
		return { userid: ele, fullname: data.find((e) => e.sourceFrom[0]['userid'] === ele)['sourceFrom'][0]['fullname'] };
	});

	console.log(data, sourceArr);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleFilterChange = async (event) => {
		setFilterCriteria(event.target.value);
	};

	const sourceFilterChange = async (event) => {
		setSourcefilterCriteria(event.target.value);
	};

	const handleDropdownChange = async (event, sku) => {
		// handle dropdown change here
		const response = await productUpdateAssignment(sku, { assigned: event.target.value });
		if (response.success) {
			alert('Product assigned!');
		} else {
			alert('Something went wrong!');
		}
	};

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editProduct, setEditProduct] = useState(null);

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
		const response = await updateProduct(formData);
		if (response.success) {
			alert('Product updated!');
			handleCloseForm();
		} else {
			alert('Something went wrong!');
		}
	};

	const deleteProduct = async (sku) => {
		const response = await productDelete(sku);
		if (response.success) {
			alert('Product deleted!');
		} else {
			alert('Something went wrong!');
		}
	};

	return (
		<div>
			<div style={{ display: 'flex', gap: 10 }}>
				<TextField label="Search by sku or productname" variant="outlined" value={searchQuery} onChange={handleSearchChange} style={{ marginBottom: '16px' }} />
				<FormControl variant="outlined" style={{ minWidth: '120px', marginBottom: '16px' }}>
					<InputLabel>Filter by category</InputLabel>
					<Select value={filterCriteria} onChange={handleFilterChange} label="Filter by category">
						{categoryArr.map((row, index) => (
							<MenuItem key={index} value={row}>
								{row}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{role !== 'admin' && (
					<FormControl variant="outlined" style={{ minWidth: '120px', marginBottom: '16px' }}>
						<InputLabel>Filter by source</InputLabel>
						<Select value={sourcefilterCriteria} onChange={sourceFilterChange} label="Filter by source">
							{sourceArr.map((row, index) => (
								<MenuItem key={index} value={row.userid}>
									{row.fullname}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Image</TableCell>
							<TableCell>SKU</TableCell>
							<TableCell>Productname</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Feature</TableCell>
							<TableCell>Rating</TableCell>
							<TableCell>Source</TableCell>
							{role === 'admin' && (
								<>
									<TableCell>Assign</TableCell>
									<TableCell>Edit</TableCell>
									<TableCell>Delete</TableCell>
								</>
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.map((row, index) => (
							<TableRow key={index}>
								<TableCell>
									<Box
										component="img"
										sx={{
											height: 233,
											width: 350,
											maxHeight: { xs: 233, md: 167 },
											maxWidth: { xs: 350, md: 250 },
										}}
										src={row.logo}
									/>
								</TableCell>
								<TableCell>{row.SKU}</TableCell>
								<TableCell>{row.productName}</TableCell>
								<TableCell>{row.category}</TableCell>
								<TableCell>{row.description}</TableCell>
								<TableCell>{row.feature}</TableCell>
								<TableCell>{row.rating}</TableCell>
								<TableCell>{row.sourceFrom[0].fullname}</TableCell>
								{role === 'admin' && (
									<>
										<TableCell>
											{row.assigned.length > 0 ? (
												row.assigned[0]['fullname']
											) : (
												<FormControl variant="outlined" style={{ minWidth: '120px' }}>
													<InputLabel>Option</InputLabel>
													<Select onChange={(event) => handleDropdownChange(event, row.SKU)} label="Option">
														{row.canAssign.map((ele) => (
															<MenuItem value={ele.userid}>{ele.fullname}</MenuItem>
														))}
													</Select>
												</FormControl>
											)}
										</TableCell>
										<TableCell>
											<Button variant="contained" color="primary" onClick={() => handleOpenForm(row)}>
												<Edit />
											</Button>
										</TableCell>
										<TableCell>
											<Button variant="contained" color="primary" onClick={() => deleteProduct(row.SKU)}>
												<Delete />
											</Button>
										</TableCell>
									</>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<ProductForm open={isFormOpen} onClose={handleCloseForm} onSubmit={handleSubmitForm} initialValues={editProduct} />
		</div>
	);
};

export default ProductGrid;
