import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/spainMessges";
import CalendarEvent from "./CalendarEvent";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  setActiveEvent,
  resetActiveEvent,
  startReloadEvent,
} from "../../actions/event";
import DeleteEvent from "../ui/DeleteEvent";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const Calendario = () => {
  const { events } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.user._id === uid ? "#367cf7" : "#45de12",
      color: "#fff",
      borderRadius: "0px",
      opacity: 0.9,
      display: "block",
    };

    return {
      style,
    };
  };
  const { activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();
  const handleDobleClickEvent = () => {
    dispatch(uiOpenModal());
  };

  useEffect(() => {
    dispatch(startReloadEvent());
  }, [dispatch]);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "day"
  );
  const onSelectedView = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  const handleSelectEvent = (event) => {
    dispatch(setActiveEvent(event));
  };

  const handleSelectedSlot = (e) => {
    dispatch(resetActiveEvent());
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventPropGetter}
        components={{ event: CalendarEvent }}
        onView={onSelectedView}
        view={lastView}
        onDoubleClickEvent={handleDobleClickEvent}
        onSelectEvent={handleSelectEvent}
        selectable={true}
        onSelectSlot={handleSelectedSlot}
      />
      {!!activeEvent && <DeleteEvent />}
    </>
  );
};
