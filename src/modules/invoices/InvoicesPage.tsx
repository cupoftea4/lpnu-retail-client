import { Box, CircularProgress, Typography } from '@mui/material';
import useInvoices from '../../hooks/useInvoices';
import InvoiceForm from './InvoiceForm';
import InvoiceTable from './InvoiceTable';

const InvoicesPage = () => {
  const { invoices, shops, isLoading, createInvoice, deleteInvoice } = useInvoices();

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
        Invoices🧾
      </Typography>
      <InvoiceForm shops={shops} createInvoice={createInvoice} />
      <InvoiceTable invoices={invoices} deleteInvoice={deleteInvoice} />
    </Box>
  );
};

export default InvoicesPage;
