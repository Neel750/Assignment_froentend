/** @format */

import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

function ProductForm({ open, onClose, onSubmit, initialValues, userList }) {
	const [formData, setFormData] = useState(initialValues || {});

	console.log(userList);

	useEffect(() => {
		if (initialValues) {
			setFormData(initialValues);
		}
	}, [initialValues]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		await onSubmit(formData);
		setFormData({});
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{initialValues ? 'Edit Product' : 'Create Product'}</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField fullWidth rows={4} label="logo" name="logo" value={formData.logo || ''} onChange={handleChange} disabled={initialValues} />
					</Grid>
					<Grid item xs={4}>
						<TextField fullWidth label="SKU" name="SKU" value={formData.SKU || ''} onChange={handleChange} disabled={initialValues} />
					</Grid>
					{initialValues && (
						<Grid item xs={4}>
							<FormControl variant="outlined" style={{ minWidth: '120px', marginBottom: '16px' }}>
								<InputLabel>Assign</InputLabel>
								<Select onChange={handleChange} name="assigned" label="Assign" disabled={initialValues}>
									{userList?.map((row, index) => (
										<MenuItem key={index} value={row.userid}>
											{row.fullname}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					)}
					<Grid item xs={12}>
						<TextField fullWidth label="Name" name="productName" value={formData.productName || ''} onChange={handleChange} />
					</Grid>
					<Grid item xs={12}>
						<TextField fullWidth label="Category" name="category" value={formData.category || ''} onChange={handleChange} />
					</Grid>
					<Grid item xs={12}>
						<TextField fullWidth multiline rows={3} label="Description" name="description" value={formData.description || ''} onChange={handleChange} />
					</Grid>
					<Grid item xs={12}>
						<TextField fullWidth multiline rows={3} label="feature" name="feature" value={formData.feature || ''} onChange={handleChange} />
					</Grid>
					<Grid item xs={12}>
						<TextField fullWidth type="number" label="Rating" name="rating" value={formData.rating || ''} onChange={handleChange} />
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleSubmit} color="primary">
					{initialValues ? 'Save' : 'Create'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ProductForm;
