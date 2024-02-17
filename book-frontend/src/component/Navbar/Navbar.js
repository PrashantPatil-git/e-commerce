import { NavLink } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import { clearCurrentUser } from "../../store/action/user.action";
import cartService from "../../service/cart.service";
import { useEffect, useState } from "react";

const Navbar = () => {
  const loginUser = useSelector((u) => u.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartNo, setCartNo] = useState();

  useEffect(() => {
    init();
  }, []);

  const logout = () => {
    dispatch(clearCurrentUser());
    navigate("/login");
  };

  const init = async () => {
    let cart = await cartService.getCart();

    // setCartNo(cart.data.length);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary p-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-white">
            <i className="fa-solid fa-book" /> Book Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/home"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item"></li>
              {/* <li className="search-form">
                                <form className="d-flex">
                                    <input className="form-control me-2 col-md-6" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-light" type="submit">Search</button>
                                </form>
                            </li> */}
            </ul>

            {
              // if user is not logged in then rendor this code
              !loginUser && (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="nav-link active"
                      aria-current="page"
                    >
                      {/* <i className="fa-solid fa-right-to-bracket"></i> Login */}
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item btn btn-outline-warning">
                    <Link to="/sellerRegister" className="nav-link active">
                      Become a seller
                    </Link>
                  </li>
                </ul>
              )
            }

            {
              // if user is already logged in then rendor this code
              loginUser && (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link active">
                      <i class="fa-solid fa-cart-shopping"></i> Cart
                    </Link>
                  </li>

                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle active"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa-solid fa-circle-user"></i>{" "}
                      {loginUser.user.firstName}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link to="editProfile" class="dropdown-item" href="#">
                          Edit Profile
                        </Link>
                      </li>

                      <li>
                        <Link to="/orders" class="dropdown-item">
                          Orders
                        </Link>
                      </li>
                      <li>
                        <a class="dropdown-item" onClick={() => logout()}>
                          logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              )
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export { Navbar };
