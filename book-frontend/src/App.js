import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ViewBook } from './pages/ViewBook';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Cart } from './pages/user/Cart';
import EditProfile from './pages/user/EditProfile'

import Orders from './pages/user/Orders';
import {SellerRegister} from './pages/seller/SellerRegister'
import SellerHome from './pages/seller/SellerHome';
/*import { Home } from './pages/Home';


*/
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/viewBook/:id' element={<ViewBook />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/EditProfile' element={<EditProfile />}></Route>
      <Route path='/orders' element={<Orders />}></Route>
      <Route path='/sellerRegister' element={<SellerRegister />}></Route>
      <Route path='/sellerHome' element={<SellerHome />}></Route>




       

        

        

      </Routes>



    </BrowserRouter>

  );
}

export default App;