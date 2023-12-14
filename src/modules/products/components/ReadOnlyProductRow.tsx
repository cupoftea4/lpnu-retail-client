import { TableRow, TableCell, Button } from "@mui/material";
import { Product } from "../../../types";

type OwnProps = {
  product: Product;
  handleEdit: () => void;
  deleteProduct: () => void;
};

const ReadOnlyRow = ({ product, handleEdit, deleteProduct }: OwnProps) => {
  return (
    <TableRow>
      <TableCell>{product.productId}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>{product.barcode}</TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={deleteProduct} sx={{ ml: 1 }}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ReadOnlyRow;
