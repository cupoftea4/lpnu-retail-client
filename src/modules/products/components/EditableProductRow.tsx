import { TableRow, TableCell, TextField, Select, MenuItem, Button } from "@mui/material";
import { Product, ProductCategory, UpdateProductDto } from "../../../types";

type OwnProps = {
  product: Product;
  productCategories: ProductCategory[];
  editFormData: UpdateProductDto;
  setEditFormData: (product: UpdateProductDto) => void;
  handleSave: () => void;
};

const EditableRow = ({ product, productCategories, editFormData, setEditFormData, handleSave }: OwnProps) => {
  return (
    <TableRow>
      <TableCell>{product.productId}</TableCell>
      <TableCell>
        <TextField size="small" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} />
      </TableCell>
      <TableCell>
        <Select
          value={editFormData.categoryId}
          onChange={(e) => setEditFormData({ ...editFormData, categoryId: +e.target.value })}
          displayEmpty
        >
          {productCategories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>{product.barcode}</TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={() => handleSave()}>
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
