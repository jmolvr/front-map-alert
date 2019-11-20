import { INIT_ALERTS, ADD_ALERT } from "../actions/ActionTypes";

const alertList = [];

const AlertReducer = (state = alertList, action) => {
  switch (action.type) {
    case INIT_ALERTS:
      return [...action.data];
    case ADD_ALERT:
      return state.concat(action.data);
    default:
      return state;
  }
};

export default AlertReducer;
