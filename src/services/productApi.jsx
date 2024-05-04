import http from './http';
import {toast} from 'sonner';
const productRoute='/product';

export const createProduct=async(data)=>{
    const response = await http.post(`${productRoute}/create`,data,{
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
};
export const getProducts = async () => {
    const response = await http.get(`${productRoute}/all`);
    return response;
  };
export const deleteProduct = async (query = '') => {
    if (!query) return toast.error('Query is required');
    const response = await http.delete(`${productRoute}/delete${query}`);
    return response;
  };