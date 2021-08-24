import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./Login.css";
import validator from "validator";
const initLoginValues = {
  lEmail: "allancastro1912@gmail.com",
  lPassword: "allan123",
};

const initRegisterValues = {
  name: "Allan",
  email: "germanPerdomo115@gmail.com",
  password: "allan123456",
  password2: "allan123456",
  DNI: "1890923234511",
  telefono: "4831212891",
};

export const LoginScreen = () => {
  const [formValues, handleLoginInputChange] = useForm(initLoginValues);
  const [formValuesRegister, handleRegisterInputChange] =
    useForm(initRegisterValues);
  const { lEmail, lPassword } = formValues;
  const { name, email, password, password2, DNI, telefono } =
    formValuesRegister;

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El nombre del usuario es obligatorio",
        "error"
      );
    } else if (name.length < 3)
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El nombre del usuario debe tener mas de 3 letras",
        "error"
      );

    if (!email) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El email del usuario es obligatorio",
        "error"
      );
    } else if (!validator.isEmail(email))
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El email ingresado no es valido",
        "error"
      );

    if (!password) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "La primer contraseña es obligatoria",
        "error"
      );
    } else if (!validator.isLength(password, { min: 8, max: 16 }))
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "La contraseña debe contener entre 8 y 16 caracteres",
        "error"
      );

    if (!password2) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "La primer contraseña es obligatoria",
        "error"
      );
    } else if (!validator.isLength(password2, { min: 8, max: 16 }))
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "La contraseña debe contener entre 8 y 16 caracteres",
        "error"
      );

    if (password !== password2) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "Las contraseñas ingresadas deben ser iguales",
        "error"
      );
    }

    if (!DNI) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El DNI es obligatorio",
        "error"
      );
    } else if (DNI.length !== 13) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El DNI es debe tener 13 caracteres",
        "error"
      );
    }

    if (!telefono) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El telefono es obligatorio",
        "error"
      );
    } else if (!validator.isMobilePhone(telefono, "es-MX")) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El telefono ingresado es incorrecto",
        "error"
      );
    }

    dispatch(startRegister({ name, email, password, DNI, telefono }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!lEmail) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El email del usuario es obligatorio",
        "error"
      );
    } else if (!validator.isEmail(lEmail))
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "El email ingresado no es valido",
        "error"
      );

    if (!lPassword) {
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "La contraseña es obligatoria",
        "error"
      );
    } else if (!validator.isLength(lPassword, { min: 8, max: 16 }))
      return Swal.fire(
        "Ocurrio un error en la validacion",
        "La contraseña debe contener entre 8 y 16 caracteres",
        "error"
      );

    dispatch(startLogin(lEmail, lPassword));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        {/* Registro de usuarios  */}

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="name"
                value={name}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="password2"
                value={password2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese su DNI"
                name="DNI"
                value={DNI}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese su Numero Telefonico"
                name="telefono"
                value={telefono}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
