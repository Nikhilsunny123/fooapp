import axiosInstance from "../helper/auth.helper";


const foodServices = {
  createfoodService: (data) =>
    axiosInstance.post("/admin/food/add", data),
  getAllfoodService: () =>
    axiosInstance.get("/admin/food/"),

  updatefoodService: (data) =>
    axiosInstance.put(`/admin/food/${data.id}`, data),
  deletefoodService: (data) =>
    axiosInstance.delete(`/admin/food/${data}`),
};

export default foodServices;
