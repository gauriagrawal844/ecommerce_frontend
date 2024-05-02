import React from 'react';
import Navbar from './components/Navbar';
import CreateProduct from './components/Product/CreateProduct';
import {Toaster} from 'sonner';
const App=()=>{
  return(
    <div>
    <Toaster position="top-center" richColors/>
      <Navbar/>
      <CreateProduct/>
    </div>
  );
};
export default App;