import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

export const NavBar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand">{name}</span>

        <button onClick={handleLogout} className="btn btn-outline-danger">
          <i className="fa fa-logout"></i> Salir
        </button>
      </nav>
    </div>
  );
};
