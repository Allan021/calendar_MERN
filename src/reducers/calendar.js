import { Types } from "../types/Types";

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case Types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case Types.eventRemoveActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };

    case Types.eventUpdated:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case Types.eventDeleted:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== state.activeEvent.id),
      };

    case Types.eventStartLoaded:
      return {
        ...state,
        events: action.payload,
      };

    case Types.eventLogout:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
