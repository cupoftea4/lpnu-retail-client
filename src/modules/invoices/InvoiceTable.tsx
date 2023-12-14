import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Invoice } from "../../types";

type OwnProps = {
  invoices: Invoice[];
  deleteInvoice: (invoiceId: number) => void;
};

const InvoiceTable = ({ invoices, deleteInvoice }: OwnProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="invoices table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main', '& .MuiTableCell-root': { color: 'white' } }}>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Shop Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map(invoice => (
            <TableRow key={invoice.invoiceId}>
              <TableCell>{invoice.invoiceId}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.note}</TableCell>
              <TableCell>{invoice.shop.name}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => deleteInvoice(invoice.invoiceId)} sx={{ ml: 1 }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
