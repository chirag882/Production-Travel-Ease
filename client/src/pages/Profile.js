import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
const Profile = () => {
  const { user } = useSelector((state) => state.users);

  // form function
  const handleSubmit = async (e) => {};

  return (
    <div>
      <div>
        <PageTitle title="User Profile" />
      </div>

      <div className="row mt-5">
        <div className="col-md-8">
          <div className="form-container" style={{ marginTop: "-40px" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                Name :
                <input
                  type="text"
                  value={user.name}
                  // onChange={(e) => setName(e.target.value)}
                  className="form-control mt-2"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
               
                />
              </div>
              <div className="mb-3">
                Email :
                <input
                  type="email"
                  value={user.email}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="form-control mt-2"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email"
                
                />
              </div>
              <div className="mb-3">
                Admin :
                <input
                  type="email"
                  value={user.isAdmin}
                  // onChange={(e) => setEmail(e.target.value)}
                  className="form-control mt-2"
                  id="exampleInputEmail1"
                  placeholder="Admin"
               
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
