import Modal from "react-modal";

import React from "react";
import { customStyles } from "../../helpers/centerModal";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import { useEffect } from "react";
import {
  resetActiveEvent,
  startNewEvent,
  startUpdateEvent,
} from "../../actions/event";
Modal.setAppElement("#root");

const startDate = moment().minutes(0).seconds(0).add(1, "hours");
const endDate = startDate.clone().add(2, "hours");

const initFormValues = {
  title: "",
  note: "",
  start: startDate.toDate(),
  end: endDate.toDate(),
};

export const CalendarModal = () => {
  const { openModal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [startDatePicker, setStartDatePicker] = useState(startDate.toDate());
  const [endDatePicker, setEndDatePicker] = useState(endDate.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initFormValues);

  const { activeEvent } = useSelector((state) => state.calendar);

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initFormValues);
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    setFormValues(initFormValues);
    dispatch(resetActiveEvent());
  };

  const handleStartDateChange = (e) => {
    setStartDatePicker(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const { title, note, start, end } = formValues;

  const handleEndDateChange = (e) => {
    setEndDatePicker(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (moment(start).isSameOrAfter(moment(end))) {
      Swal.fire(
        "Hubo un error en la validacion",
        "La fecha Final debe ser  mayor a la del final",
        "error"
      );
    }

    if (title.trim().length < 2) {
      setTitleValid(false);
      return;
    }
    setTitleValid(true);
    setFormValues(initFormValues);
    if (activeEvent) {
      dispatch(startUpdateEvent(formValues));
    } else {
      dispatch(startNewEvent(formValues)); //mandar los formvalues al reducer o sea al nackend
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={openModal}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> {!!activeEvent ? "Editar evento" : "Nuevo Evento"}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDatePicker}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDatePicker}
            minDate={startDatePicker}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            value={note}
            placeholder="Notas"
            rows="5"
            name="note"
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
