import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import User from "../../model/User";
import sellerService from "../../service/seller.service";

import { toast, ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

// to change the state (current authenticated user)
import { setCurrentUser } from "../../store/action/user.action";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  panNumber: "",
  passWord: "",
  mobileNumber: "",
  confirmPassWord: "",
};

const SellerRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = useSelector((u) => u.user);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    panNumber: "",
    passWord: "",
    mobileNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value,
  //     };
  //   });
  // };

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: initialValues,
      //validationSchema: signupUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
        sellerService
          .register(values)
          .then((res) => {
            const navigateToHomePageTimeout = setTimeout(() => {
              // after successfully login register navigate to the home page of seller
              navigate("/");
            }, 2000);

            notify(res.data.message);
            // set the current authenticated user as new registered user using dispatcher of react-redux
            // dispatch(setCurrentUser({ user: data.data.user }));

            // clear the time out settled for before navigate to home page
          })
          .catch((error) => {
            console.log(error);
            if (error.response?.status === 409) {
              notify("Email id already exist");
              navigate("/sellerRegister");
            }
          });

        action.resetForm();
      },
    });

  const notify = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div
      className="container-fluid p-2"
      style={{
        //backgroundImage: `url(${back})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card paint-card">
            <div className="card-header">
              <h3 className="text-center text-dark">Signup</h3>
              {succMsg && (
                <p className="fs-4 text-success text-center">{succMsg}</p>
              )}
              {errorMsg && (
                <p className="fs-4 text-danger text-center">{errorMsg}</p>
              )}
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control form-control-sm"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName ? (
                      <p className="text-danger">{errors.firstName}</p>
                    ) : null}
                  </div>
                  <div className="col">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control form-control-sm"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName ? (
                      <p className="text-danger">{errors.lastName}</p>
                    ) : null}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label>Email Id</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-sm"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="text-danger">{errors.email}</p>
                    ) : null}
                  </div>

                  <div className="col">
                    <label>Pan Card </label>
                    <input
                      type="string"
                      name="panNumber"
                      className="form-control form-control-sm"
                      value={values.panNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.panNumber && touched.panNumber ? (
                      <p className="text-danger">{errors.panNumber}</p>
                    ) : null}
                  </div>

                  <div className="col">
                    <label>Mobile No</label>
                    <input
                      type="string"
                      name="mobileNumber"
                      className="form-control form-control-sm"
                      value={values.mobileNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.mobileNumber && touched.mobileNumber ? (
                      <p className="text-danger">{errors.mobileNumber}</p>
                    ) : null}
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col">
                    <label>Password</label>
                    <input
                      type="text"
                      name="passWord"
                      id="psw"
                      className="form-control form-control-sm"
                      value={values.passWord}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.passWord && touched.passWord ? (
                      <p className="text-danger">{errors.passWord}</p>
                    ) : null}
                  </div>
                  <div className="col">
                    <label>Confirm Password</label>
                    <input
                      type="text"
                      name="confirmpassword"
                      className="form-control form-control-sm"
                      value={values.confirmpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirmpassword && touched.confirmpassword ? (
                      <p className="text-danger">{errors.confirmpassword}</p>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="text-center mt-3">
                      {/* Use Link component with "to" prop to specify the target route */}
                      <Link
                        to="/sellerLogin"
                        className="btn btn-primary col-md-12"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary col-md-12"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export { SellerRegister };
