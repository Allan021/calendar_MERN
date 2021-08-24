import React from "react";
import AddNewEvent from "../ui/AddNewEvent";
import DeleteEvent from "../ui/DeleteEvent";
import { NavBar } from "../ui/NavBar";
import { Calendario } from "./Calendar";
import { CalendarModal } from "./CalendarModal";

const CalendarScreen = () => {
  return (
    <div className="calendar-container">
      <NavBar />
      <Calendario />

      <AddNewEvent />
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
