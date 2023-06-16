import React, { useState } from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {user} = useSelector(state => state.users);
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menuToBeRendered =  user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if(window.location.pathname.includes('book-now')){
    activeRoute = '/'
  }
  return (
    <div className="layout-parent">
      <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">TE</h1>
        <h1 className="role">{user?.name} <br/> Role : {user?.isAdmin ? 'Admin' : 'User'}</h1>
      </div>
        <div className="d-flex flex-column gap-3 justify-content-start menu ">
          {menuToBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.path && "active-menu-item"
                } menu-item`}
                onClick={() => {
                  if (item.path === "/logout") {
                    localStorage.removeItem("token");
                    navigate("/login");
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                <i className={item.icon}></i>
                {!collapsed && <span>{item.name}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header">
          {collapsed ? (
            <i
              className="ri-menu-2-fill"
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            ></i>
          ) : (
            <i
              className="ri-close-circle-line"
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            ></i>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
