import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    TextField,
    Typography
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";


interface Filter {
    Name: string;
    Stock: string;
    Dates: string;
}

interface Item {
    _id: string;
    File_name: string;
    Name: string;
    Price: number;
    Dates: string;
    Stock: string;
}

const Search: React.FC = () => {
    const [data, setData] = useState<Item[]>([]);
    const [filters, setFilter] = useState<Filter>({
        Name: '',
        Stock: '',
        Dates: ''
    });

    const fetchStocks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/product/search', {
                params: filters,
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    useEffect(() => {
        fetchStocks();
    }, [filters]);

    const getDate = (dates: string): string => {
        const today = new Date(dates);
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    };

    return (
        <div>
            <Box sx={{ display: { sm: 'flex' }, flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: { sm: 'flex' }, flexDirection: 'column', width: '700px', margin: 5 }}>
                    <Box>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <TextField
                                type="text"
                                label='Name'
                                value={filters.Name}
                                onChange={(e) => { setFilter({ ...filters, Name: e.target.value }) }}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <TextField
                                type="date"
                                value={filters.Dates}
                                onChange={(e) => { setFilter({ ...filters, Dates: e.target.value }) }}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 100 }}>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={filters.Stock}
                                onChange={(e) => { setFilter({ ...filters, Stock: e.target.value }) }}
                                label='Filter'
                            >
                                <MenuItem value="">Filter</MenuItem>
                                <MenuItem value="In Stock">In Stock</MenuItem>
                                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Button
                                variant="contained"
                                sx={{ height: '50px', margin: 1 }}
                                onClick={fetchStocks}
                            >
                                Filter
                            </Button>
                        </FormControl>
                    </Box>
                    <Box>
                        <TableContainer sx={{ width: '700px' }} component={Paper}>
                            <Table>
                                <TableHead sx={{ bgcolor: '#1565c0' }}>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Create Date</TableCell>
                                        <TableCell>Stock</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.length > 0 ? (
                                            data.map((item) => (
                                                <TableRow key={item._id}>
                                                    <TableCell>
                                                        <img
                                                            src={`http://localhost:5000/view/${item.File_name}`}
                                                            alt={item.Name}
                                                            width="100"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{item.Name}</TableCell>
                                                    <TableCell>{item.Price}</TableCell>
                                                    <TableCell>{getDate(item.Dates)}</TableCell>
                                                    <TableCell>{item.Stock}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <Typography variant="h3">No Stock found</Typography>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default Search;
