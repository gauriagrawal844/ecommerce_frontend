import React, {useState} from 'react';
import Button from '../../UI/Button';
import InputField from '../../UI/InputField';
import {createProduct} from '../../services/productApi';
import { getErrorMessage, getSuccessMessage } from '../../utils/function';
import { toast } from 'sonner';
import Loader from '../../UI/Loader';

export default function CreateProduct(){
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('');
    const [image,setImage]=useState(null);
    const [loading,setLoading]=useState(false);
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try {
            if(!name||!price||!category||!description){
                return toast.warning('Please fill all the necessary fields!')
            }
            setLoading(true);
            const res=await createProduct({
                name,
                price,
                description,
                category,
                image,
            });
            setName('');
            setPrice('')
            setCategory('');
            setDescription('');
            setImage('');
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
        />
        <Button label={'Submit'} type={'submit'} disabled={loading} />
      </form>
    )

}