import http from './http';
import {toast} from 'sonner';
const userRoute='/user';

export const signup=async(data)=>{
    const response = await http.post(`${userRoute}/signup`,data);
    return response;
};
export const login=async(data)=>{
    const response = await http.post(`${userRoute}/login`,data);
    return response;
};
export const getUsers = async () => {
    const response = await http.get(`${userRoute}/all`);
    return response;
  };
export const deleteUser = async (query = '') => {
    if (!query) return toast.error('Query is required');
    const response = await http.delete(`${userRoute}/delete${query}`);
    return response;
  };
  export const updateUser = async (data, query = '') => {
    const response = await http.put(`${userRoute}/update${query}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  };