import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from './Store';

const api = 'http://localhost:5000/api/product';


export interface Product {
    _id: string;
    Name: string;
    Price: string;
    Dates: string;
    Stock: string;
    File_name: string;
}

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};


export const getitem = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${api}/find`);

        const data = await response.data;
        dispatch(setProducts(data));
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

export const getitembyid = createAsyncThunk<Product, string>('product/fetchById', async (id) => {
    const response = await axios.get(`${api}/find/${id}`);
    return response.data;
});

export const postitem = createAsyncThunk<Product, FormData>('product/add', async (productData) => {
    const response = await axios.post(`${api}/create`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
});

export const putitem = (productData: Product) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.put(`${api}/update/${productData._id}`, productData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const data = await response.data;
        dispatch(updateProduct(data));
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

export const deleteitem = createAsyncThunk<string, string>('product/delete', async (id) => {
    await axios.delete(`${api}/remove/${id}`);
    return id;
});


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
        },
        updateProduct(state, action: PayloadAction<Product>) {
            state.products = state.products.map((product) =>
                product._id === action.payload._id ? action.payload : product
            );
        },
        deleteProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter((product) => product._id !== action.payload);
        },
    },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;