import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

const AddNewEvent = () => {
  const dispatch = useDispatch();
  const handleNewEvent = () => {
    dispatch(uiOpenModal());
  };
  return (
    <button onClick={handleNewEvent} className="btn btn-primary fae">
      <i className="fa fa-plus"></i>
    </button>
  );
};

export default AddNewEvent;
