
import axios, { AxiosResponse } from 'axios';

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    name: string;
    password: string;
}

export interface ProductData {
    Name: string;
    Price: string;
    File_name: string;
    Stock: string;
    Dates: string;
}

const baseUrl = 'https://localhost:5000/api/product';


async function getdata(data: RegisterData): Promise<AxiosResponse<unknown>> {

    const response = await axios.post('https://localhost:5000/api/auth/register', data);
    return response;
}

async function getdatas(data: LoginData): Promise<AxiosResponse<unknown>> {

    const response = await axios.post('https://localhost:5000/api/auth/login', data);
    return response;
}

async function updateProduct(id: string, data: ProductData): Promise<AxiosResponse<unknown>> {

    const response = await axios.put(`${baseUrl}/update/${id}`, data);
    return response;

}

async function deleteProduct(id: string): Promise<AxiosResponse<unknown>> {
    const response = await axios.delete(`${baseUrl}/remove/${id}`);
    return response;

}

const getProductone = async (id: string): Promise<AxiosResponse<unknown>> => {

    const response = await axios.get(`${baseUrl}/find/${id}`);
    return response;
};

async function createProduct(product: ProductData): Promise<AxiosResponse<unknown>> {

    const response = await axios.post(`${baseUrl}/create`, product);
    return response.data;
}

export { getdata, getdatas, createProduct, getProductone, updateProduct, deleteProduct };

