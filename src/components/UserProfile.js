/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { GlobalContext } from '../contexts/globalContext';

function UserProfilePage() {
	const { userData, userUpdate } = useContext(GlobalContext);

	const [data, setData] = useState();
	const [isEditing, setIsEditing] = useState(true);

	useEffect(() => {
		setData({
			fullname: userData?.fullname,
			email: userData?.email,
			userid: userData?.userid,
		});
	}, [userData]);

	const handleChange = (e) => {
		const value = e.target.value;
		setData({ ...data, fullname: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(data); // You can replace this with your submit logic
		const response = await userUpdate(data);
		if (response.success) {
			alert('User updated!!!');
			setIsEditing(true);
		} else {
			alert('Something went wrong.');
		}
	};

	return (
		<div>
			<h1>User Profile</h1>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField fullWidth label="Name" name="fullname" value={data?.fullname} onChange={handleChange} disabled={!!isEditing} />
					</Grid>
					<Grid item xs={12}>
						<TextField fullWidth label="Email" name="email" value={data?.email} onChange={handleChange} disabled />
					</Grid>
					<Grid item xs={12}>
						<TextField fullWidth label="Userid" name="userid" value={data?.userid} onChange={handleChange} disabled />
					</Grid>
					<Grid item xs={12}>
						{isEditing && (
							<Button variant="contained" color="primary" type="button" onClick={() => setIsEditing(false)}>
								Edit
							</Button>
						)}
						{!isEditing && (
							<Button variant="contained" color="primary" type="submit">
								Save
							</Button>
						)}
					</Grid>
				</Grid>
			</form>
		</div>
	);
}

export default UserProfilePage;
