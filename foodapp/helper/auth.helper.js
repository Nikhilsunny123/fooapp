import axios from "axios";

const serverAddress = process.env.REACT_NATIVE_APP_SERVER_ADDRESS;

//
var axiosInstance = axios.create({ baseURL: serverAddress });
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the user token from local storage
    const user = localStorage.getItem("token");

    // If a user token is available, set the Authorization header
    if (user) {
      config.headers.Authorization = `Bearer ${user}`;
    }

    return config;
  },
  (error) => {
    // Log and reject the request error
    console.log("request error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.clear();
      window.location.href = "/login";
      // Handle 403 Forbidden error
      console.log("403 Forbidden error:", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
