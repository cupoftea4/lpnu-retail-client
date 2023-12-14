import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { CreateProductDto, ProductCategory } from "../../types";

type OwnProps = {
  productCategories: ProductCategory[];
  newProduct: CreateProductDto;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => void;
  handleCreateProduct: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ProductForm = ({ productCategories, newProduct, handleInputChange, handleCreateProduct }: OwnProps) => {
  return (
    <Box component="form" onSubmit={handleCreateProduct} sx={{ mb: 2 }}>
      <TextField
        label="Name"
        name="name"
        variant='filled'
        value={newProduct.name}
        onChange={handleInputChange}
        required
        sx={{ mr: 1 }}
      />
      <Select
        name="categoryId"
        value={newProduct.categoryId}
        onChange={handleInputChange}
        variant='filled'
        displayEmpty
        required
        sx={{ mr: 1, minWidth: 120 }}
      >
        {productCategories.map(category => (
          <MenuItem key={category.categoryId} value={category.categoryId}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        variant='filled'
        label="Barcode"
        name="barcode"
        value={newProduct.barcode}
        onChange={handleInputChange}
        required
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">Add Product</Button>
    </Box>
  );
};

export default ProductForm;
