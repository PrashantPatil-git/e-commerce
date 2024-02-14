import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { setCurrentUser } from "../../store/action/user.action";
import userService from "../../service/user.service";

import { useFormik } from "formik";

// import css for this file
import "../../css/userProfile.css";

const Profile = () => {
  // reference object for useFormik as well acting as a data for Profile component
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    email: "",
    password: "",
    mobNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    profileUrl: "",
  });

  // access the user state
  const loginUser = useSelector((state) => state.user);

  // to dispatch the redux actions to the reducers to update the state
  const dispatch = useDispatch();

  // toast buttons

  const notifyError = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notify = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    setUser(loginUser.user);
  }, []);

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: loginUser.user,

      onSubmit: (values, action) => {
        console.log(values);

        // show spinner
        // setShowSpinner(true);

        // execute the userService method to update the state of user with new state
        /*

        userService
          .update(values)
          .then((data) => {
            notify("Profile updated sucessfully");

            // set the current authenticated user as new registered user using dispatcher of react-redux
            dispatch(setCurrentUser({ user: data.data.user }));

            // clear the time out settled for before navigate to home page
          })
          .catch((error) => {
            console.log(error);

            // handle the corresponding erros
            if (error.response?.status === 400) {
              notifyError(error.response.data);
              // setShowSpinner(false);
            }
          });
          */
      },
    });

  return (
    // <div
    //   className="container-fluid p-2"
    //   style={{
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //   }}
    // >
    //   <div className="row">
    //     <div className="col-md-6 offset-md-3">
    //       <div className="card paint-card">
    //         <div className="card-header">
    //           <h3 className="text-center text-dark">Edit Profile</h3>
    //         </div>
    //         <div className="card-body">
    //           <form
    //             action="addUser"
    //             className=""
    //             method="post"
    //             onSubmit={(e) => update(e)}
    //           >
    //             <div className="row">
    //               <div className="col">
    //                 <label>First Name</label>
    //                 <input
    //                   type="text"
    //                   name="firstName"
    //                   required
    //                   className="form-control form-control-sm"
    //                   defaultValue={user.firstName}
    //                   onChange={(e) => handleChange(e)}
    //                 />
    //               </div>
    //             </div>
    //             <div className="row mt-3">
    //               <div className="col">
    //                 <label>Email Id</label>
    //                 <input
    //                   type="email"
    //                   name="email"
    //                   required
    //                   readOnly
    //                   className="form-control form-control-sm"
    //                   value={user.email}
    //                   onChange={(e) => handleChange(e)}
    //                 />
    //               </div>
    //               <div className="col">
    //                 <label>Mobile No</label>
    //                 <input
    //                   type="number"
    //                   name="mobNo"
    //                   required
    //                   maxLength={10}
    //                   minLength={10}
    //                   className="form-control form-control-sm"
    //                   value={user.mobileNumber}
    //                   onChange={(e) => handleChange(e)}
    //                 />
    //               </div>
    //             </div>

    //             <div className="form-group mt-3">
    //               <label>Address</label>
    //               <textarea
    //                 required
    //                 rows="3"
    //                 cols=""
    //                 className="form-control"
    //                 name="address"
    //                 value={user.address}
    //                 onChange={(e) => handleChange(e)}
    //               ></textarea>
    //             </div>

    //             <div className="row mt-3">
    //               <div className="col">
    //                 <label>City</label>
    //                 <input
    //                   type="text"
    //                   name="city"
    //                   required
    //                   className="form-control form-control-sm"
    //                   value={user.city}
    //                   onChange={(e) => handleChange(e)}
    //                 />
    //               </div>
    //               <div className="col">
    //                 <label>State</label>
    //                 <input
    //                   type="text"
    //                   name="state"
    //                   className="form-control form-control-sm"
    //                   value={user.state}
    //                   onChange={(e) => handleChange(e)}
    //                 />
    //               </div>

    //               <div className="col">
    //                 <label>Pincode</label>
    //                 <input
    //                   type="number"
    //                   name="pincode"
    //                   className="form-control form-control-sm"
    //                   value={user.pincode}
    //                   onChange={(e) => handleChange(e)}
    //                 />
    //               </div>
    //             </div>

    //             <div className="text-center mt-3">
    //               <button className="btn btn-primary col-md-12">update</button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <ToastContainer
    //     position="top-center"
    //     autoClose={5000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //   />
    // </div>

    <>
      <form onSubmit={handleSubmit}>
        <div id="user-profile-section">
          <div id="profile-icon">
            <div>
              {/* profile icon */}

              {user.profileUrl ? (
                <img
                  src={user.profileUrl}
                  className="profile-img"
                  alt={user.firstName}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                // show svg dummy, image if user not selected any image
              )}
            </div>
          </div>
          <div>
            <input
              type="file"
              id="fileInput"
              className="file-input"
              accept="image/*"
              name={values.profileUrl}
              onChange={handleChange}
            />
            <label for="fileInput" className="file-label">
              Choose File
            </label>
          </div>

          <div className="email-section">
            <div>
              <label htmlFor="emailName" class="styled-label">
                Email
              </label>
              <input
                type="text"
                className="styled-input w-425"
                id="email"
                value={values.email}
              />
            </div>
          </div>
          <div id="name-section">
            <div className="name">
              <label htmlFor="firstName" class="styled-label">
                First Name
              </label>
              <input
                type="text"
                className="styled-input w-200"
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="name">
              <label htmlFor="lastName" class="styled-label">
                Last Name
              </label>
              <input
                type="text"
                className="styled-input w-200"
                id="lastName"
                value={values.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          <div className="mobile-number-section">
            <div>
              <label htmlFor="mobileNumber" class="styled-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="styled-input w-425"
                id="mobileNumber"
                value={values.mobileNumber}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                required
              />
            </div>
          </div>

          <div>
            <button className="btn btn-outline-dark">update changes</button>
          </div>
        </div>
      </form>

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
    </>
  );
};

export default Profile;
