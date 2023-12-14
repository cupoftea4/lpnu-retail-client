import React, { ChangeEvent, FormEvent, useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Link, 
  Container, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent 
} from '@mui/material';
import { UserData } from '../../types';

type OwnProps = {
  mode: 'login' | 'register';
  onSubmit: (e: React.FormEvent<HTMLFormElement>, data: UserData) => void;
};

const AuthForm = ({ mode, onSubmit }: OwnProps) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    role: 'seller',
  });

  const isLogin = mode === 'login';

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event, userData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card variant="outlined" sx={{ width: '100%', borderRadius: '16px', boxShadow: 3, p: 2 }}>
          <CardContent>
            <Typography component="h1" variant="h5" textAlign="center">
              {isLogin ? 'Sign in' : 'Register'}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {!isLogin && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    type="text"
                    id="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="secondName"
                    label="Second Name"
                    type="text"
                    id="secondName"
                    value={userData.secondName}
                    onChange={handleChange}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      value={userData.role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="seller">Seller</MenuItem>
                      <MenuItem value="worker">Worker</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                value={userData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, borderRadius: '10px' }}
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
              {isLogin ? (
                <Box textAlign="center">
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Register here"}
                  </Link>
                </Box>
              ) : (
                <Box textAlign="center">
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign in"}
                  </Link>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AuthForm;
