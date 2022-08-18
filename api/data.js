import axios from "./axios";
//封装请求图表数据
export const getHome = () => {
  return axios.request({
    url: "/home/getData",
    method: "get",
  });
};
//封装用户表格数据
export const getUser = (params) => {
  return axios.request({
    url: "/user/getUser",
    method: "get",
    params,
  });
};
//封装用户登录权限请求
export const getMenu = (params) => {
  return axios.request({
    url: "/permission/getMenu",
    method: "post",
    data: params,
  });
};
