import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteitem, getitem, putitem, Product as ReduxProduct } from "../redux/Crudslice";
import { AppDispatch, RootState } from "../redux/Store";


interface Products extends ReduxProduct {
    _id: string;
    Name: string;
    Price: string;
    Dates: string;
    Stock: string;
    File_name: string;
    // image:File
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ItemTable: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [editId, setEditId] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const selector = useSelector((state: RootState) => state.Product.products);

    useEffect(() => {
        dispatch(getitem());
    }, [dispatch]);

    const handleEdit = (item: Products) => {
        setEditId(item._id);
        setName(item.Name);
        setPrice(item.Price);
        setDate(item.Dates);
        setStock(item.Stock);
        setImage(null);  // We don't load image to avoid unnecessary changes
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteitem(id));
        window.location.reload();
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Here, you should extract form data from your form fields, not pass `formData` as a parameter.
        const formData = new FormData();

        // Populate your formData (example values):
        formData.append('Name', name);
        formData.append('Price', price.toString());
        formData.append('Dates', date);
        formData.append('Stock', stock);
        formData.append('image', image as Blob);  

        const product: Products = {
            _id: editId ?? "",
            Name: formData.get('Name') as string,
            Price: formData.get('Price') as string,
            Dates: formData.get('Dates') as string,
            Stock: formData.get('Stock') as string,
            File_name: formData.get('image') as string,  
        };

        // Now dispatch the product to the store
        await dispatch(putitem(product));
        setEditId(null);
        setOpen(false);
    };


    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: "700px", margin: 5 }}>
                <Link to="/product">
                    <Button variant="contained" sx={{ mb: 2 }}>
                        Add New Item
                    </Button>
                </Link>
                <Link to="/search">
                    <Button variant="contained" sx={{ mb: 2 }}>
                        Search
                    </Button>
                </Link>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#1565c0" }}>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Create Date</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selector.map((item:Products) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <img src={`http://localhost:5000/api/product/view/${item.File_name}`} alt={item.Name} width="100" />
                                    </TableCell>
                                    <TableCell>{item.Name}</TableCell>
                                    <TableCell>{item.Price}</TableCell>
                                    <TableCell>{new Date(item.Dates).toLocaleDateString()}</TableCell>
                                    <TableCell>{item.Stock}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => { handleEdit(item); handleOpen(); }} variant="outlined" sx={{ mr: 1 }}>Edit</Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(item._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TextField type='text' color='secondary' value={name} onChange={(e) => { setName(e.target.value) }} label="Product_name" variant="filled" />
                        <TextField type='text' value={price} onChange={(e) => { setPrice(e.target.value) }} color='secondary' label="Price" variant="filled" />
                        <TextField type='file' color='secondary' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files ? e.target.files[0] : null;
                            if (file) {
                                setImage(file);
                            }
                        }} variant="filled" />
                        <TextField
                            fullWidth
                            label="Date"
                            name="Date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            margin="normal"
                            color='error'
                            focused
                            required
                        />
                        <TextField
                            fullWidth
                            label="Stock"
                            name="Stock"
                            type="text"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            margin="normal"
                            color='error'
                            focused
                            required
                        />
                        <Button onClick={handleSubmit}>Send</Button>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default ItemTable;
