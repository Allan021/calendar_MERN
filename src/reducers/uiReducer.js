import { Types } from "../types/Types";

const initialState = {
  openModal: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.openModal:
      return {
        ...state,
        openModal: true,
      };

    case Types.closeModal:
      return {
        ...state,
        openModal: false,
      };

    default:
      return state;
  }
};
