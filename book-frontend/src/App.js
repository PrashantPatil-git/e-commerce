import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./component/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { ViewBook } from "./pages/ViewBook";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Cart } from "./pages/user/Cart";
import EditProfile from "./pages/user/Profile";
import SellerLogin from "./pages/seller/SellerLogin";
import Orders from "./pages/user/Orders";
import { SellerRegister } from "./pages/seller/SellerRegister";
import SellerHome from "./pages/seller/SellerHome";
/*import { Home } from './pages/Home';


*/
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AdminLogin } from "./pages/admin/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/viewBook/:id" element={<ViewBook />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/EditProfile" element={<EditProfile />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/sellerRegister" element={<SellerRegister />}></Route>
        <Route path="/sellerHome" element={<SellerHome />}></Route>
        <Route path="/sellerLogin" element={<SellerLogin />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>




        {/* navigate the admin to the login page only if there is no user or admin is logged in */}
        <Route
          path="/admin-login"
          element={localStorage.loginUser === null? <AdminLogin/> : <Navigate to="/Home" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
