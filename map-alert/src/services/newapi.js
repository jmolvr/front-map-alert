import axios from "axios";
// import { AsyncStorage } from "react-native";

const api = axios.create({
  baseURL: "https://mapalertunifapapi.herokuapp.com",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc2NzI1NDYwLCJqdGkiOiI5ZGJjNzM5MTUyYjY0OGE5YjliNjY0ZDBiOGI2NWE3YyIsInVzZXJfaWQiOjJ9.V9cu3b1Ltv57teuFmgeAh0-jmtO06IO3i-jITf4tRiM"
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

export const getAlerts = async url => {
  try {
    const response = await api.get(`/api/alert/`);
    return response.data;
  } catch (err) {
    console.log("Fetch erro data---------", err);
  }
};
