
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { postitem } from "../redux/Crudslice";
import type { AppDispatch } from '../redux/Store';
import { useNavigate } from "react-router-dom";


const Product: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [dates, setDates] = useState('');
    const [stock, setStock] = useState('');

    const navi = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (image) {
            const formData = new FormData();
            formData.append('Name', name);
            formData.append('Price', price);
            formData.append('image', image);
            formData.append('Dates', dates);
            formData.append('Stock', stock);

            await dispatch(postitem(formData));
            alert('Product added successfully!');
            navi('/list')
        }
    }

    return (
        <Box sx={{ display: { sm: "flex" }, height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Box
                maxWidth="400px"
                mx="auto"
                sx={{ width: "400px", textAlign: "center", bgcolor: "#1565c0", padding: 2, borderRadius: 5 }}
                boxShadow={5}
                mt={5}
            >
                <Typography variant="h4" color="error" mb={3}>
                    Add Product
                </Typography>
                <Box sx={{ margin: 3 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                        color="error"
                        focused
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="Price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        margin="normal"
                        color="error"
                        focused
                        required
                    />
                    <TextField
                        fullWidth
                        type="file"
                        name="image"
                        margin="normal"
                        color="error"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                        }
                        focused
                        required
                    />
                    <TextField
                        fullWidth
                        label="Date"
                        name="Date"
                        type="date"
                        value={dates}
                        onChange={(e) => setDates(e.target.value)}
                        margin="normal"
                        color="error"
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
                        color="error"
                        focused
                        required
                    />
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        sx={{ mt: 4, bgcolor: "#ff1744" }}
                    >
                        Add Item
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Product;
