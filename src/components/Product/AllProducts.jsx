import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/productApi';
import ProductCard from '../../UI/ProductCard';
import CreateProduct from './CreateProduct';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data.data);
  };

  console.log(isEdit, selectedProduct);

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <CreateProduct
        setProducts={setProducts}
        products={products}
        selectedProduct={selectedProduct}
        isEdit={isEdit}
      />
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard
            setSelectedProduct={setSelectedProduct}
            setIsEdit={setIsEdit}
            product={product}
            key={product._id}
            setProducts={setProducts}
            products={products}
          />
        ))}
      </div>
    </>
  );
};

export default AllProducts;
