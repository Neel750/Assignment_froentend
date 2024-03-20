/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import ProductList from './components/ProductList';
import CommonLayout from './layout/CommonLayout';
import UserProfilePage from './components/UserProfile';
import { GlobalContext } from './contexts/globalContext';

function App() {
	const { userData, setUserData, userLogout } = useContext(GlobalContext);
	const [isLogedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userData'));
	useEffect(() => {
		if (localStorage.getItem('userData')) {
			try {
				setUserData(JSON.parse(localStorage.getItem('userData')));
				setIsLoggedIn(true);
			} catch {
				userLogout();
			}
		}
	}, []);
	useEffect(() => {
		console.log('User', isLogedIn);
		if (userData) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [userData]);
	return (
		<Routes>
			{/* <Route path="/login" exact element={<Login />} /> */}
			{isLogedIn ? (
				<Route path="/" element={<CommonLayout />}>
					<Route index element={<ProductList />} />
					<Route path="/create-user" element={<CreateUser />} />
					<Route path="/user" element={<UserProfilePage />} />
					{/* Add more routes for other pages */}
				</Route>
			) : (
				<Route path="/login" exact element={<Login />} />
			)}
			<Route path="*" element={<Navigate to={isLogedIn ? '/' : '/login'} replace />} />
		</Routes>
	);
}

export default App;
