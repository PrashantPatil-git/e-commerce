import { SET_CURRENT_ADMIN, CLEAR_CURRENT_ADMIN } from "../type";

export const setCurrentAdmin = (admin) => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: admin,
  };
};

export const clearCurrentSeller = () => {
  return {
    type: CLEAR_CURRENT_ADMIN,
  };
};
