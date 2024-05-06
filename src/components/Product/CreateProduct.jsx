import React, { useEffect, useState } from 'react';
import Button from '../../UI/Button';
import InputField from '../../UI/InputField';
import { createProduct, updateProduct } from '../../services/productApi';
import { getErrorMessage, getSuccessMessage } from '../../utils/function';
import { toast } from 'sonner';
import Loader from '../../UI/Loader';

export default function CreateProduct({
  products,
  setProducts,
  selectedProduct,
  isEdit,
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isEdit) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
      setDescription(selectedProduct.description);
      setCategory(selectedProduct.category);
      setImage(selectedProduct.image);
    }
  }, [isEdit, selectedProduct]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!name || !price || !description || !category) {
        return toast.warning('Please fill all the fields');
      }
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('image', image);
      const res = isEdit
        ? await updateProduct(formData)
        : await createProduct(formData);
      setName('');
      setPrice('');
      setCategory('');
      setDescription('');
      setPrice('');
      setImage('');
      if (isEdit) {
        setProducts(
          products.map((item) => {
            if (item._id === selectedProduct._id) {
              return res.data.data;
            }
            return item;
          })
        );
      } else {
        setProducts([...products, res.data.data]);
      }
      toast.success(getSuccessMessage(res));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  console.log(image);
  if (loading) return <Loader />;
  return (
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
        // value={image}
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/png, image/jpeg"
      />
      <Button label={'Submit'} type={'submit'} disabled={loading} />
    </form>
  );
}
