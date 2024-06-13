import AxiosClient from 'axios';

const GlobalApi = AxiosClient.create({
    baseURL: 'http://localhost:1337/api'
});
// men get semua data
const getAllProduct = () => GlobalApi.get('/products?populate=*');
// get category item
const getCategoryList = () => GlobalApi.get('/categories?populate=*');
// postcart
const postCart = (data: any, token: any) => GlobalApi.post('/carts', data, {headers: {Authorization: `Bearer ${token}`}});


export const Globalapi = {
    getAllProduct,
    getCategoryList,
    postCart
}



