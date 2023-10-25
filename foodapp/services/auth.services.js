import axios from "axios";


const serverAddress = process.env.REACT_APP_AUTOLABS_SERVER_ADDRESS;

const loginServices = {
  signUpService: (data) => axios.post(`${serverAddress}/user/signup`, data),
  loginService: (data) => axios.post(`${serverAddress}/user/login`, data),
};
export default loginServices;
