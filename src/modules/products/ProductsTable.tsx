import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Product, ProductCategory, UpdateProductDto } from "../../types";
import EditableRow from "./components/EditableProductRow";
import ReadOnlyRow from "./components/ReadOnlyProductRow";

type OwnProps = {
  products: Product[];
  editProductId: number | null;
  handleEdit: (product: Product) => void;
  handleSave: (productId: number) => void;
  deleteProduct: (productId: number) => void;
  productCategories: ProductCategory[];
  editFormData: UpdateProductDto;
  setEditFormData: (product: UpdateProductDto) => void;
};

const ProductTable = ({ 
  products, editProductId, handleEdit, handleSave, deleteProduct, productCategories, editFormData, setEditFormData 
}: OwnProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="products table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main', '& .MuiTableCell-root': { color: 'white' } }}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category ID</TableCell>
            <TableCell>Barcode</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) =>
            editProductId === product.productId ? (
              <EditableRow 
                key={product.productId} 
                product={product} 
                productCategories={productCategories}
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                handleSave={() => handleSave(product.productId)} 
              />
            ) : (
              <ReadOnlyRow 
                key={product.productId} 
                product={product} 
                handleEdit={() => handleEdit(product)} 
                deleteProduct={() => deleteProduct(product.productId)} 
              />
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
