import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Header from './Header'
import Search from './Search'
import ItemTable from './ItemTable'
import Product from './Product'
import { Provider } from 'react-redux'
import store from '../redux/Store'


const Routerpage = () => (
    <div>
        <Provider store={store}>
            <Routes>
                {/* <Route path='/' element={<Navigate to='/list' />}></Route> */}
                <Route path='/' element={<Header />}>
                    <Route path='/product' element={<Product />}></Route>
                    <Route path='/list' element={<ItemTable />}></Route>
                    <Route path='/search' element={<Search />}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </Provider>
    </div>

);

export default Routerpage;