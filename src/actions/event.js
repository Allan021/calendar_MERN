import Swal from "sweetalert2";
import { fecthConTocken } from "../helpers/fetch";
import { parsearEventos } from "../helpers/parseEvents";
import { Types } from "../types/Types";

export const startUpdateEvent = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fecthConTocken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();

      if (body.ok) {
        dispatch(updateEvent(event));
      } else {
        Swal.fire("Error en la actualizacion", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startDeleteEvent = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;

    try {
      const resp = await fecthConTocken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();

      console.log(body);
      if (body.ok) {
        dispatch(eventDeleted());
        dispatch(resetActiveEvent());
      } else {
        Swal.fire("Error en la eliminacion", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startReloadEvent = () => {
  return async (dispatch) => {
    try {
      const resp = await fecthConTocken("events/");
      const body = await resp.json();

      if (body.ok) {
        const events = parsearEventos(body.eventos);
        dispatch(loadEvents(events));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const loadEvents = (eventos) => ({
  type: Types.eventStartLoaded,
  payload: eventos,
});

export const startNewEvent = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fecthConTocken("events/", event, "POST");
      const body = await resp.json();

      //aca lo inserto en la base de datos
      if (body.ok) {
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name,
        };
      }
      //aca modifico la UI
      dispatch(AddActiveEvent(event));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setActiveEvent = (event) => ({
  type: Types.eventSetActive,
  payload: event,
});

export const updateEvent = (event) => ({
  type: Types.eventUpdated,
  payload: event,
});

export const AddActiveEvent = (event) => ({
  type: Types.eventAddNew,
  payload: event,
});

export const resetActiveEvent = () => ({
  type: Types.eventRemoveActiveEvent,
});
const eventDeleted = () => ({
  type: Types.eventDeleted,
});
export const eventLogout = () => ({ type: Types.eventLogout });
