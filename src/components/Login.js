/** @format */

import React, { useContext, useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { GlobalContext } from '../contexts/globalContext';

const LoginPage = () => {
	const { navigate, userLogin } = useContext(GlobalContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async (e) => {
		// Handle login logic here, e.g., sending credentials to a server
		e.preventDefault();
		console.log('Email:', email);
		console.log('Password:', password);
		if (email.trim() === '' || password.trim() === '') {
			setError('Please fill in all fields.');
		} else {
			const response = await userLogin(email, password);
			if (response.success) {
				navigate('/');
			} else {
				setError('Invalid email or password.');
			}
		}
	};

	return (
		<Container
			maxWidth="sm"
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh', // Take up full viewport height
			}}
		>
			<Typography variant="h4" gutterBottom>
				Login
			</Typography>
			<form onSubmit={handleLogin} style={{ width: '100%' }}>
				<TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} error={error && email.trim() === ''} helperText={error && email.trim() === '' && 'Email is required'} />
				<TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} error={error && password.trim() === ''} helperText={error && password.trim() === '' && 'Password is required'} />
				{error && <Typography color="error">{error}</Typography>}
				<Button type="submit" variant="contained" color="primary" fullWidth>
					Login
				</Button>
			</form>
		</Container>
	);
};

export default LoginPage;
