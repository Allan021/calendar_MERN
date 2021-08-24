import { Types } from "../types/Types";

//el cheking
const initialState = {
  cheking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.authLogin:
      return {
        ...state,
        cheking: false,
        ...action.payload,
      };

    case Types.authChekingFinish:
      return {
        ...state,
        cheking: false,
      };

    case Types.authLogout:
      return {
        cheking: false,
      };
    default:
      return state;
  }
};
