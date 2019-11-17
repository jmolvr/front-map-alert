import axios from "axios";
import { AsyncStorage } from "react-native";

const api = axios.create({
  baseURL: "https://mapalertunifapapi.herokuapp.com"
});

// api.interceptors.request.use(async config => {
//   try {
//     const token = await AsyncStorage.getItem("@MapAlert:token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   } catch (err) {
//     alert(err);
//   }
// });

export default api;
