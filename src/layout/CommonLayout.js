/** @format */

import React, { useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Container, IconButton, Hidden } from '@mui/material';
import { AccountCircle, AddCircle, Edit, ExitToApp, Menu, List as ListIcon } from '@mui/icons-material';
import { GlobalContext } from '../contexts/globalContext';

const CommonLayout = () => {
	const [open, setOpen] = useState(true);

	const { navigate, userData, userLogout } = useContext(GlobalContext);

	const logOut = async () => {
		await userLogout();
		navigate('/login');
	};

	const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<div>
			{/* App Bar */}
			<AppBar position="fixed" elevation={0}>
				<Toolbar>
					{/* <Hidden smUp> */}
					<IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
						<Menu />
					</IconButton>
					{/* </Hidden> */}
					<Typography variant="h6" noWrap component="div">
						Assignment
					</Typography>
				</Toolbar>
			</AppBar>

			<div style={{ marginTop: 80 }}>
				{/* Side Drawer */}
				<Hidden smDown>
					<Drawer
						variant="persistent"
						open={open}
						onClose={toggleDrawer}
						sx={{
							'& .MuiDrawer-paper': { width: 240, marginTop: '80px' },
						}}
						style={{ top: '63px' }}
					>
						<List>
							<ListItem button component={Link} to="/user">
								<ListItemIcon>
									<AccountCircle />
								</ListItemIcon>
								<ListItemText primary="User" />
							</ListItem>
							{userData?.role === 'admin' && (
								<ListItem button component={Link} to="/create-user">
									<ListItemIcon>
										<AddCircle />
									</ListItemIcon>
									<ListItemText primary="Create User" />
								</ListItem>
							)}

							<ListItem button component={Link} to="/">
								<ListItemIcon>
									<ListIcon />
								</ListItemIcon>
								<ListItemText primary="Products" />
							</ListItem>

							<ListItem button onClick={logOut}>
								<ListItemIcon>
									<ExitToApp />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItem>
						</List>
					</Drawer>
				</Hidden>

				{/* Main Content */}
				<Container maxWidth="xl" sx={open ? { mt: 4, ml: '240px', width: '70vw' } : { mt: 4, width: '70vw' }} xs={{ ml: '0' }}>
					<Outlet />
				</Container>
			</div>

			{/* Drawer for Mobile */}
			<Hidden smUp>
				<Drawer
					variant="temporary"
					open={open}
					onClose={toggleDrawer}
					sx={{
						'& .MuiDrawer-paper': { width: 240, marginTop: '60px' },
					}}
				>
					<List>
						<ListItem button component={Link} to="/user">
							<ListItemIcon>
								<AccountCircle />
							</ListItemIcon>
							<ListItemText primary="User" />
						</ListItem>
						<ListItem button component={Link} to="/create-user">
							<ListItemIcon>
								<AddCircle />
							</ListItemIcon>
							<ListItemText primary="Create User" />
						</ListItem>
						<ListItem button component={Link} to="/update-profile">
							<ListItemIcon>
								<Edit />
							</ListItemIcon>
							<ListItemText primary="Update Profile" />
						</ListItem>
						<ListItem button component={Link} to="/product">
							<ListItemIcon>
								<ListIcon />
							</ListItemIcon>
							<ListItemText primary="Product" />
						</ListItem>
						<ListItem button component={Link} to="/list-product">
							<ListItemIcon>
								<ListIcon />
							</ListItemIcon>
							<ListItemText primary="List Product" />
						</ListItem>
						<ListItem button component={Link} to="/create-product">
							<ListItemIcon>
								<AddCircle />
							</ListItemIcon>
							<ListItemText primary="Create Product" />
						</ListItem>
						<ListItem button component={Link} to="/edit-product">
							<ListItemIcon>
								<Edit />
							</ListItemIcon>
							<ListItemText primary="Edit Product" />
						</ListItem>
						<ListItem button component={Link} to="/logout">
							<ListItemIcon>
								<ExitToApp />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItem>
					</List>
				</Drawer>
			</Hidden>
		</div>
	);
};

export default CommonLayout;
