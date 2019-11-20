import { ALERT_DETAILS } from "../actions/ActionTypes";

alertId = 0;

const AlertDetailsReducer = (state = alertId, action) => {
  switch (action.type) {
    case ALERT_DETAILS:
      return action.data;
    default:
      return state;
  }
};

export default AlertDetailsReducer;
