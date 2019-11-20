import {
  INIT_ALERTS,
  ADD_ALERT,
  UPDATE_CURRENT_LOCATION,
  ALERT_DETAILS
} from "./ActionTypes";

export const handleAlertInfo = data => {
  return {
    type: INIT_ALERTS,
    data
  };
};

export const handleAddAlert = data => {
  return {
    type: ADD_ALERT,
    data
  };
};

export const updateCurrentLocation = data => {
  return {
    type: UPDATE_CURRENT_LOCATION,
    payload: {
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta: 0.0922 / 30,
      longitudeDelta: 0.0421 / 30
    }
  };
};

export const handleAlertDetails = data => {
  return {
    type: ALERT_DETAILS,
    data
  };
};
