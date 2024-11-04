import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

const NodeServer = "https://stingray-app-jmrty.ondigitalocean.app/api";
const pythonServer = "https://urchin-app-5vle5.ondigitalocean.app/";

api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }

    config.baseURL = NodeServer;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.request.use(
//   (config) => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo?.token) {
//       config.headers.Authorization = `Bearer ${userInfo.token}`;
//     }

//     if (config.url.includes("/path-for-backend1")) {
//       config.baseURL = backend1;
//     } else if (config.url.includes("/path-for-backend2")) {
//       config.baseURL = backend2;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;
