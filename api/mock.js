import Mock from "mockjs";
import homeApi from "./mockServerData/home";
import userApi from "./mockServerData/user";
import permissionApi from "./mockServerData/permission";

//拦截请求图表数据
Mock.mock("/api/home/getData", homeApi.getStatisticalData);
//拦截添加用户请求
Mock.mock("/user/add", "post", userApi.createUser);
//拦截编辑用户请求
Mock.mock("/user/edit", "post", userApi.updateUser);
//拦截删除用户请求
Mock.mock(/user\/del/, "get", userApi.deleteUser);
//拦截表格列表数据
Mock.mock(/api\/user\/getUser/, "get", userApi.getUserList);
// 拦截用户权限菜单请求
Mock.mock(/api\/permission\/getMenu/, "post", permissionApi.getMenu);
