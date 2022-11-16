import axios, { AxiosError, AxiosResponse } from "axios";
import { ElLoadingService, ElMessage } from "element-plus";
/**
 * Axios实例
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 6000,
});
/**
 * loading控制变量
 * 请求拦截器
 */
let loading: null | ReturnType<typeof ElLoadingService>;
request.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    loading = ElLoadingService({
      lock: true,
      text: "加载中。。。",
      background: "rgba(0, 0, 0, 0.7)",
    });
    return config;
  },
  ({ message }: AxiosError) => {
    ElMessage.error({ message: "请求时发生了一些问题" });
    console.error(message);
  }
);
/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (res: AxiosResponse) => {
    const { data, status, statusText } = res;
    if (status === 200) {
      loading?.close();
      return data;
    } else {
      ElMessage.warning({ message: statusText });
      console.warn(statusText);
    }
  },
  ({ message }: AxiosError) => {
    loading?.close();
    ElMessage.error({ message });
    console.error(message);
  }
);
/**
 * 导出方法
 */
export default async <T = unknown>({
  method = "post",
  url = "",
  data = {},
  params = {},
}) => {
  return (await request({
    method,
    url,
    data,
    params,
  })) as unknown as T;
};
