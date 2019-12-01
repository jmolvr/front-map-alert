import axios from "axios";
import { AsyncStorage } from "react-native";

const api = axios.create({
  baseURL: "https://mapalertunifapapi.herokuapp.com",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc3NTYzNDUzLCJqdGkiOiJhYzM4MzVmMTAyZGU0ZGVkODc5ODcwYTZkY2U5ODBhYyIsInVzZXJfaWQiOjF9.VNnOZ4QywwT5PYLglyvnFWVSwH8LLEl3psEPnGsHM9U"
  }
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
