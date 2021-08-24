import Swal from "sweetalert2";
import { fecthConTocken, fecthSinTocken } from "../helpers/fetch";
import { Types } from "../types/Types";
import { eventLogout } from "./event";

export const startLogin = (email, password) => {
  //al ser una peticion asincrona entonces usare thunk para llamar acciones scinronas
  return async (dispatch) => {
    const resp = await fecthSinTocken("auth", { email, password }, "POST");

    const body = await resp.json();

    if (body.uid) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-time", new Date().getTime());

      dispatch(Login(body.uid, body.name));

      Swal.fire(
        "Operacion realizada con exito",
        `Usuario ${body.name} logueado con exito`,
        "success"
      );
      dispatch(finishCheck());
    } else {
      Swal.fire("Oops Ocurrio un error!", body.msg, "error");
      dispatch(finishCheck());
    }
  };
};

export const startRegister = (data) => {
  return async (dispatch) => {
    const resp = await fecthSinTocken("auth/new", { ...data }, "POST");

    const body = await resp.json();

    if (body.uid) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-time", new Date().getTime());

      dispatch(Login(body.uid, body.name));
      Swal.fire(
        "Operacion realizada con exito",
        `Usuario ${body.name} registrado con exito`,
        "success"
      );
      dispatch(finishCheck());
    } else {
      Swal.fire("Oops Ocurrio un error!", body.msg, "error");
      dispatch(finishCheck());
    }
  };
};

export const revalidarTocken = () => {
  return async (dispatch) => {
    const resp = await fecthConTocken("auth/renew");
    const body = await resp.json();
    if (body.uid) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-time", new Date().getTime());

      dispatch(Login(body.uid, body.name));
    }
  };
};

//era obivon que aqui yo hare la petccion al servidor con este Logi
const Login = (uid, name) => ({
  type: Types.authLogin,
  payload: { uid, name },
});

//basicamente aqui pondre el checking en true porque aun esta pendiente y el cheking quiere decir pendiente
const finishCheck = () => ({
  type: Types.authChekingFinish,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(eventLogout());
  };
};

const logout = () => ({ type: Types.authLogout });
