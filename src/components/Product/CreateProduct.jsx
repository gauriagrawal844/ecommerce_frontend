import React, {useState} from 'react';
import Button from '../../UI/Button';
import InputField from '../../UI/InputField';
import {createProduct} from '../../services/productApi';
import { getErrorMessage, getSuccessMessage } from '../../utils/function';
import { toast } from 'sonner';
import Loader from '../../UI/Loader';

export default function CreateProduct({
  products,
  setProducts,
  selectedproduct,
  isEdit,}){

    const [name,setName]=useState(isEdit ? selectedproduct.name : '');
    const [price,setPrice]=useState(isEdit ? selectedproduct.price : '');
    const [description,setDescription]=useState(isEdit ? selectedproduct.description : '');
    const [category,setCategory]=useState(isEdit ? selectedproduct.thumbnail : '');
    const [image,setImage]=useState(isEdit ? selectedproduct.name : '');
    const [loading,setLoading]=useState(false);
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try {
            if(!name||!price||!category||!description){
                return toast.warning('Please fill all the necessary fields!')
            }
            setLoading(true);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('image', image);
            const res = await createProduct(formData);
            setName('');
            setPrice('')
            setCategory('');
            setDescription('');
            setImage('');
            setProducts([...products,res.data.data]);
            toast.success(getSuccessMessage(res));
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
        finally{
            setLoading(false);
        }
    };
    if(loading) 
    {return <Loader/>;}
    return(
        <form className="p-10 flex flex-col gap-4 w-1/2" onSubmit={handleSubmit}>
        <InputField
          type="text"
          labelName="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          type="number"
          labelName="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <InputField
          type="text"
          labelName="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          type="text"
          labelName="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <InputField
          type="file"
          labelName="Image"
          onChange={(e) => setImage(e.target.files[0])}
          accept="img/png,image/jpeg"
        />
        <Button label={'Submit'} type={'submit'} disabled={loading} />
      </form>
    );

}