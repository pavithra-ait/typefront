import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getdata, getdatas, createProduct, getProductone, updateProduct, deleteProduct } from './main';

const mock = new MockAdapter(axios);

describe('API Functions', () => {
    beforeEach(() => {
        mock.reset();
    });

    test('should register a user successfully', async () => {
        const registerData = { name: 'John', email: 'john@example.com', password: 'password123' };
        
        mock.onPost('https://localhost:5000/api/auth/register').reply(200, { success: true });

        const response = await getdata(registerData);
        
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ success: true });
    });

    test('should login successfully', async () => {
        const loginData = { name: 'John', password: 'password123' };

        mock.onPost('https://localhost:5000/api/auth/login').reply(200, { success: true });

        const response = await getdatas(loginData);

        expect(response.status).toBe(200);
        expect(response.data).toEqual({ success: true });
    });

    test('should create a product successfully', async () => {
        const productData = { Name: 'Product 1', Price: '100', File_name: 'product1.jpg', Stock: '10', Dates: '2022-12-01' };

        mock.onPost('https://localhost:5000/api/product/create').reply(200, { success: true, data: productData });

        const response = await createProduct(productData);
        expect(response.data).toEqual(productData);
    });

    test('should update product successfully', async () => {
        const productData = { Name: 'Updated Product', Price: '150', File_name: 'product1.jpg', Stock: '5', Dates: '2022-12-01' };
        const productId = '1';

        // Mock the PUT request
        mock.onPut(`https://localhost:5000/api/product/update/${productId}`).reply(200, { success: true });

        const response = await updateProduct(productId, productData);

        expect(response.status).toBe(200);;
    });

    test('should delete product successfully', async () => {
        const productId = '1';

        // Mock the DELETE request
        mock.onDelete(`https://localhost:5000/api/product/remove/${productId}`).reply(200, { success: true });

        const response = await deleteProduct(productId);

        expect(response.status).toBe(200);
    });

    test('should fetch a single product successfully', async () => {
        const productId = '1';

        // Mock the GET request
        mock.onGet(`https://localhost:5000/api/product/find/${productId}`).reply(200, { success: true });

        const response = await getProductone(productId);

        expect(response.status).toBe(200);
    });
});

