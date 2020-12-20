import { RxAxios } from "./axios";
import { ContentTypeEnum, ResultEnum, RequestEnum } from "./enum";
import { AxiosTransform } from "./axiosTransform";
import { RequestOptions, Result } from "./types";
import { AxiosResponse } from "axios";
import { isString } from "/@/utils/is/index";
import { ElMessage, ElMessageBox } from "element-plus";
import qs from "qs";

const isDev = process.env.NODE_ENV === "development";

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    const {
      isTransformRequestResult,
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText
    } = options;

    const reject = Promise.reject;

    const resp_data = res.data;
    const { code, data, message } = resp_data;
    // 请求成功
    const hasSuccess =
      resp_data &&
      Reflect.has(resp_data, "code") &&
      code === ResultEnum.SUCCESS;

    // 是否显示提示信息
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        ElMessage.success({
          message: successMessageText || message || "操作成功！",
          type: "success"
        });
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        ElMessage.error(message || errorMessageText || "操作失败！");
      } else if (!hasSuccess && options.errorMessageMode === "modal") {
        // errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        ElMessageBox.confirm(message, "错误提示");
      }
    }

    if (!isTransformRequestResult) {
      return res.data;
    }

    console.log("URL Resp: ", resp_data);

    if (!resp_data) {
      return reject(resp_data);
    }

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return data;
    }
    // 接口请求错误，统一提示错误信息
    if (code === ResultEnum.ERROR) {
      if (message) {
        ElMessage.error(message);

        Promise.reject(new Error(message));
      } else {
        const msg = "操作失败,系统异常!";
        ElMessage.error(msg);

        Promise.reject(new Error(msg));
      }
      return reject();
    }

    // 登录超时
    if (code === ResultEnum.TIMEOUT) {
      // if (router.currentRoute.value.name == "login") return;
      // // 到登录页
      const timeoutMsg = "登录超时,请重新登录!";
      // Modal.destroyAll();
      // Modal.warning({
      //   title: "提示",
      //   content: "登录身份已失效,请重新登录!",
      //   onOk: () => {
      //     router.replace({
      //       name: "login",
      //       query: {
      //         redirect: router.currentRoute.value.fullPath
      //       }
      //     });
      //     storage.clear();
      //   }
      // });
      return reject(new Error(timeoutMsg));
    }

    if (!hasSuccess) {
      return reject(new Error(message));
    }

    return resp_data;
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      isParseToJson
    } = options;

    config.url = isDev ? `/api${config.url}` : `${apiUrl || ""}${config.url}`;

    if (config.method === RequestEnum.GET) {
      const now = new Date().getTime();
      if (!isString(config.params)) {
        config.data = {
          // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
          params: Object.assign(config.params || {}, {
            _t: now
          })
        };
      } else {
        // 兼容restful风格
        config.url = config.url + config.params + `?_t=${now}`;
        config.params = {};
      }
    } else {
      if (!isString(config.params)) {
        config.data = config.params;
        config.params = {};
        // if (joinParamsToUrl) {
        //   config.url = setObjToUrlParams(config.url as string, config.data);
        // }
      } else {
        // 兼容restful风格
        config.url = config.url + config.params;
        config.params = {};
      }

      if (!isParseToJson) {
        config.params = qs.stringify(config.params, {
          arrayFormat: "brackets"
        });
        config.data = qs.stringify(config.data, { arrayFormat: "brackets" });
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: config => {
    // 请求之前处理config
    // const token = store.getters.token;

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {};
    const msg: string =
      response && response.data && response.data.error
        ? response.data.error.message
        : "";
    const err: string = error.toString();
    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        ElMessage.error("接口请求超时,请刷新页面重试!");
        return;
      }
      if (err && err.includes("Network Error")) {
        ElMessageBox.alert("请检查您的网络连接是否正常!", "网络异常");
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
    // 请求是否被取消
    const isCancel = (error as any).__CANCEL__;
    if (!isCancel) {
      // checkStatus(error.response && error.response.status, msg);
    } else {
      console.warn(error, "请求被取消！");
    }
    return error;
  }
};

const axios = new RxAxios({
  timeout: 30 * 1000,

  // prefixUrl: prefix,
  headers: { "Content-Type": ContentTypeEnum.FORM_URLENCODED },
  // 数据处理方式
  transform,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 默认将prefix 添加到url
    joinPrefix: true,
    // 需要对返回数据进行处理
    isTransformRequestResult: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 格式化提交参数时间
    formatDate: true,
    // 消息提示类型
    errorMessageMode: "none",
    isShowSuccessMessage: true,
    // 接口地址
    apiUrl: process.env.VUE_APP_API_URL
  },
  withCredentials: false
});

export default axios;
