import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './modules/auth/ProtectedRoute';
import { Login } from './modules/auth/Login';
import { Register } from './modules/auth/Register';
import { AuthProvider } from './context/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ProductsPage from './modules/products/ProductsPage';
import InvoicesPage from './modules/invoices/InvoicesPage';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B4242', 
    },
    secondary: {
      main: '#092635',
    },
    background: {
      default: '#9EC8B9',
    },
    text: {
      primary: '#092635',
      secondary: '#1B4242',
    }
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
        <AuthProvider>
        <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
            </Route>
          </Routes>
        </AuthProvider>
        </Router>
    </ThemeProvider>
  );
};

export default App;