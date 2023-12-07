import axios from "axios";
import _, { reject } from "lodash";
import customParamsSerializer from "./customParamsSerializer";
import { config } from "process";
import { resolve } from "path";

const { CancelToken } = axios;
const sources: Record<string, any> = {};
const service = axios.create({
  baseURL: "/",
  timeout: 20000,
  paramsSerializer: customParamsSerializer,
});

service.interceptors.request.use(
  (config) => {
    const requestUrl =
      JSON.stringify(config?.url) + JSON.stringify(config.data);
    config.cancelToken = new CancelToken((cancel) => {
      sources[requestUrl] = cancel;
    });
    config.headers.token = "1111";
    config.headers["content-Type"] = "application/json;charset=utf-8";
    config.headers["Accept-Lanuage"] = "zh-CN";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return {message: "请求已取消"};
    }
    const { status , data } = error.response;

  }
);

type RequestType = {
  url: string;
  data: any;
  config: any;
  method: "get" | "post" | "put" | "delete";
};
const request = ({ url, data, config, method }: RequestType) => {
  const body =
    method === "get"
      ? { params: data, ...config }
      : Array.isArray(data)
      ? [...data]
      : { ...data };
  return new Promise((resolve, reject) => {
    service[method](url, body, config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        const { data, status} = error.response;
        reject(error);
      });
  });
};

/**
 * 取消请求
 */
const cancelRequest = (url?: string | string[]) => {
  if (!url) return Object.values(sources).forEach((cancel) => cancel());
  const urls = typeof url === "string" ? [url] : url;
  Object.entries(sources).forEach(([key, cancel]) =>
    urls.some((item) => key.includes(item) && cancel())
  );
};

const axiosGet = (url: string, data: any, config = {}) => {
  return request({ url, data, config, method: "get" });
};

const axiosPost = (url: string, data: any, config = {}) => {
  return request({ url, data, config, method: "post" });
};

const axiosPut = (url: string, data: any, config = {}) => {
  return request({ url, data, config, method: "put" });
};

const axiosDelete = (url:string, data:any, config ={}) => {
  return request({url, data, config, method: 'delete'});
}
export { axiosGet, axiosPost, axiosPut, axiosDelete, cancelRequest };
