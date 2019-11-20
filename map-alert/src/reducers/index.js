import { combineReducers } from "redux";
import AlertReducer from "./AlertReducer";
import RegionReducer from "./RegionReducer";
import AlertDetailsReducer from "./AlertDetailsReducer";

export default combineReducers({
  alerts: AlertReducer,
  region: RegionReducer,
  alertDetails: AlertDetailsReducer
});
