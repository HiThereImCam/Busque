import { OPEN_NAV_MODAL, CLOSE_NAV_MODAL } from "../actions/nav_actions";

const NavReducer = (initialState = false, action) => {
  Object.freeze(initialState);

  switch (action.type) {
    case OPEN_NAV_MODAL:
      return action.value;
    case CLOSE_NAV_MODAL:
      return action.value;
    default:
      return initialState;
  }
};

export default NavReducer;
