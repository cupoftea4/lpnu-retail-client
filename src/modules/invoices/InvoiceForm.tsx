import { Box, Select, MenuItem, TextField, Button, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateInvoiceDto, Shop } from "../../types";

type OwnProps = {
  shops: Shop[];
  createInvoice: (invoice: CreateInvoiceDto) => Promise<void>;
};

const InvoiceForm = ({ shops, createInvoice }: OwnProps) => {
  const [newInvoice, setNewInvoice] = useState<CreateInvoiceDto>({ shopId: shops[0]?.shopId ?? '', note: '' });
  console.log('shops', shops);

  useEffect(() => { // a bad idea but still
    setNewInvoice(prev => ({ ...prev, shopId: shops[0]?.shopId ?? '' }));
  }, [shops]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setNewInvoice(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createInvoice(newInvoice);
    setNewInvoice({ shopId: shops[0]?.shopId, note: '' }); // Reset form
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <Select
        name="shopId"
        value={newInvoice.shopId}
        onChange={handleInputChange}
        variant='filled'
        displayEmpty
        required
        sx={{ mr: 1, minWidth: 120 }}
      >
        {shops.map(shop => (
          <MenuItem key={shop.shopId} value={shop.shopId}>
            {shop.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Note"
        name="note"
        variant='filled'
        value={newInvoice.note}
        onChange={handleInputChange}
        required
        sx={{ mr: 1 }}
      />
      <Button type="submit" variant="contained" color="primary">Add Invoice</Button>
    </Box>
  );
};

export default InvoiceForm;
