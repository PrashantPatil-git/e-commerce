import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ViewBook } from './pages/ViewBook';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Cart } from './pages/user/Cart';
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

        {/*
        
        <Route path='/books' element={<Books />}></Route>
        
        
         */}

        

        

      </Routes>



    </BrowserRouter>

  );
}

export default App;