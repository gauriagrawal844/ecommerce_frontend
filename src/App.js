import React from 'react';
import Navbar from './components/Navbar';
import CreateProduct from './components/Product/CreateProduct';
import {Toaster} from 'sonner';
import AllProducts from './components/Product/AllProducts';
const App=()=>{
  return(
    <div>
    <Toaster position="top-center" richColors/>
      <Navbar/>
      <AllProducts/>
    </div>
  );
};
export default App;