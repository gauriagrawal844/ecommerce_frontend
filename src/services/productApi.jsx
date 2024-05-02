import http from './http';
const productRoute='/product';
export const createProduct=async(data)=>{
    const response = await http.post(`${productRoute}/create`,data);
    return response;
};