import React, { useContext, useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { GlobalContext } from '../contexts/globalContext';

function CreateUser() {

    const { userCreate } = useContext(GlobalContext);
    const [error, setError] = useState('');


    const [formData, setFormData] = useState({
        "email": "",
        "password": "",
        "fullname": "",
        "role": "user"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here, e.g., send data to server
        console.log(formData);
        if (formData.email.trim() === '' || formData.password.trim() === '') {
            setError('Please fill in email and password fields.');
        } else {
            const response = await userCreate(formData);
            if (response.success) {
                alert("User created!!!");
            }
            else {
                setError('Invalid email or password.');
            }

        }
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Create user
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            label="Name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={error && formData.email.trim() === ''}
                            helperText={error && formData.email.trim() === '' && 'Email is required'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={error && formData.password.trim() === ''}
                            helperText={error && formData.password.trim() === '' && 'Password is required'}
                        />
                    </Grid>
                    {error && <Typography color="error">{error}</Typography>}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default CreateUser;
