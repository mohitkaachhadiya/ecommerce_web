
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Route, Routes } from 'react-router-dom';
import Product from '../pages/Product';
import AddProduct from '../pages/AddProduct';
import Privateroute from '../componets/Privateroute';
import Reveiws from '../pages/reveiws';
import AppLayout from '../layouts/AppLayout';


function App() {


  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Login />} />
          <Route element={<Privateroute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/reveiw/:productId/:userId' element={<Reveiws />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
          <Route element={<Privateroute roles={['admin']} />}>
            <Route path="/home/:id" element={<AddProduct />} />
            <Route path="/home/add" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
