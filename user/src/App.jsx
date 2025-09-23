
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Route, Routes } from 'react-router-dom';
import Product from '../pages/Product';
import Cart from '../componets/Cart';
import AddProduct from '../pages/AddProduct';
import Privateroute from '../componets/Privateroute';
import Reveiws from '../pages/reveiws';


function App() {


  return (
    <>
      <Cart />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/' element={<Privateroute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/reveiw/:productId/:userId' element={<Reveiws />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/home/:id" element={<AddProduct />} />
          <Route path="/home/add" element={<AddProduct />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
