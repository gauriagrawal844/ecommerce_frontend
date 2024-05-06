import React, { useState } from 'react';
import Button from './Button';
import GradiantButton from './GradiantButton';
import { deleteProduct } from '../services/productApi';
import { toast } from 'sonner';
import { getErrorMessage, getSuccessMessage } from '../utils/function';
import Loader from './Loader';

const ProductCard = ({
  product,
  products,
  setProducts,
  setIsEdit,
  setSelectedProduct,
}) => {
  const { name, description, price, category, thumbnail, _id } = product;
  const [loading, setLoading] = useState(false);
  const handleDeleteProduct = async () => {
    try {
      const isDelete = window.confirm('Are you sure you want to delete it?');
      setLoading(isDelete);
      const res = await deleteProduct(`?_id=${_id}`);
      const newProducts = products.filter((item) => item._id !== _id);
      setProducts(newProducts);
      toast.success(getSuccessMessage(res));
    } catch (error) {
      return toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img
        className="h-48 w-full object-cover object-center"
        src={thumbnail}
        alt="Product Image"
      />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
          {name}
        </h2>
        <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
          {description}
        </p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
            {price}
          </p>
          {/* <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
            $25.00
          </p> */}
          <p className="ml-auto text-base font-medium text-green-500">
            {category}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <GradiantButton
          label={'Edit'}
          color="purple"
          color2="red"
          onClick={() => {
            setSelectedProduct(product);
            setIsEdit(true);
          }}
        />
        <GradiantButton 
          label={'Delete'}
          color="black"
          color2="red"
          onClick={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ProductCard;
