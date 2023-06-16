import React, {  useEffect, useState } from "react";
import {message} from 'antd';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {SetUser} from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.users);
  const navigate = useNavigate();
  const url = 'http://localhost:5000';
  const validateToken = async () => {
    try {
      dispatch(ShowLoading());
      const tok = localStorage.getItem("token");  
      const response = await axios.post(
        `${url}/api/users/get-user-by-id`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tok}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        
        dispatch(SetUser(response.data.data));
      } else {
        localStorage.removeItem("token");
        message.error(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      localStorage.removeItem("token");
      message.error(error.message);
      dispatch(HideLoading());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  },[]);

  return <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>;
};

export default ProtectedRoute;
