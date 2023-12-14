import { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography, SelectChangeEvent } from '@mui/material';
import useProducts from '../../hooks/useProducts';
import { CreateProductDto, Product, UpdateProductDto } from '../../types';
import ProductForm from './ProductForm';
import ProductTable from './ProductsTable';

const ProductsPage = () => {
  const { products, productCategories, isLoading, deleteProduct, updateProduct, createProduct } = useProducts();
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<UpdateProductDto>({ name: '', categoryId: 0 });
  const [newProduct, setNewProduct] = useState<CreateProductDto>(
    { categoryId: 0, name: '', barcode: '' }
  );

  useEffect(() => { // a bad idea but still
    setNewProduct({ categoryId: productCategories[0]?.categoryId ?? '', name: '', barcode: '' });
  }, [productCategories]);

  const handleEdit = (product: Product) => {
    setEditProductId(product.productId);
    setEditFormData({ name: product.name, categoryId: product.category.categoryId });
  };

  const handleSave = async (productId: number) => {
    await updateProduct(productId, editFormData);
    setEditProductId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProduct(newProduct);
    setNewProduct({ categoryId: productCategories[0]?.categoryId ?? 0, name: '', barcode: '' }); // Reset form
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ ml: 2, fontWeight: 'bold' }}>
        Products 🍕
      </Typography>
      <ProductForm 
        productCategories={productCategories} 
        newProduct={newProduct} 
        handleInputChange={handleInputChange} 
        handleCreateProduct={handleCreateProduct} 
      />
      <ProductTable 
        products={products} 
        editProductId={editProductId} 
        handleEdit={handleEdit} 
        handleSave={handleSave} 
        deleteProduct={deleteProduct}
        productCategories={productCategories}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
      />
    </Box>
  );
};

export default ProductsPage;
