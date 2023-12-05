import axios from "axios";
import * as Utils from "@utils";
import {
  apiDomainURL,
  localDomainURL,
  mqttDomainUrl,
  stripeConnectDomainUrl
} from "./redirectConfig";
const apiServices = axios.create({
  baseURL: apiDomainURL,
});

axios.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await refreshAccessToken();
    originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
    return axios(originalRequest);
  }
  return Promise.reject(error);
});

async function refreshAccessToken() {
  const res = await apiServices.post(`/api/usermanagement/api/kc/RefreshToken`, {
    refresh_token: localStorage.getItem('refreshToken')
  })

  if (res) {
    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('refreshToken', res.data.refresh_token)
  }
  return res.data.access_token;
}

const getHeader = ({
  isBearerDisable = false,
  isAuthShow = true,
  isContentEncoding = false,
  isHideToken = false,
  options = {},
  isTenantIdRequired = false,
  additionalHeaders: additionalHeaderParams = {}
}) => {
  let { tenantId = "", token = "" } = Utils.getStorage() || {};
  let isAuthorization: any = {};

  if (isAuthShow) {
    isAuthorization = { Authorization: token || "" };
  }
  if (isHideToken) {
    isAuthorization = {};
  }
  if (isContentEncoding) {
    isAuthorization["Content-Encoding"] = "gzip";
  }
  let additionalHeaders = {};
  if (isTenantIdRequired) {
    additionalHeaders = {
      "X-Tenant-ID": tenantId,
    }
  }
  return {
    headers: {
      ...isAuthorization,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      ...options,
      ...additionalHeaders,
      ...additionalHeaderParams
    },
  };
};
const getGetAPI = (props: any) => {
  const {
    prefixUrl = apiDomainURL,
    pathName = "",
    options = {},
    isBearerDisable = false,
    isHideToken = false,
    isAuthShow = true,
    isTenantIdRequired = false,
    additionalHeaders = {}
  } = props;
  const defaultOption = {
    ...getHeader({
      isBearerDisable,
      isHideToken,
      isAuthShow,
      isTenantIdRequired,
      additionalHeaders
    }),
    ...options,
  };
  return axios.get(`${prefixUrl}${pathName}`, defaultOption);
};
const getPostAPI = (props: any) => {
  const {
    prefixUrl = apiDomainURL,
    pathName = "",
    body = {},
    options = {},
    isBearerDisable = false,
    isHideToken = false,
    isAuthShow = true,
    isTenantIdRequired = false
  } = props;
  const defaultOption = {
    ...getHeader({
      isBearerDisable,
      isHideToken,
      isAuthShow,
      isTenantIdRequired
    }),
    ...options,
  };
  return axios.post(`${prefixUrl}${pathName}`, body, defaultOption);
};
const getPutAPI = (props: any) => {
  const {
    prefixUrl = apiDomainURL,
    pathName = "",
    body = {},
    options = {},
    isBearerDisable = false,
    isAuthShow = true,
    isHideToken = false,
    isTenantIdRequired = false
  } = props;
  const defaultOption = {
    ...getHeader({ isBearerDisable, isAuthShow, isHideToken, isTenantIdRequired }),
    ...options,
  };
  return axios.put(`${prefixUrl}${pathName}`, body, defaultOption);
};
const getDeleteAPI = (props: any) => {
  const {
    prefixUrl = apiDomainURL,
    pathName = "",
    data = {},
    options = {},
    isBearerDisable = false,
    isAuthShow = true,
    isHideToken = false,
    isTenantIdRequired = false
  } = props;
  const defaultOption = {
    ...getHeader({ isBearerDisable, isAuthShow, isHideToken, isTenantIdRequired }),
    ...options,
  };
  return axios.delete(`${prefixUrl}${pathName}`, {
    headers: { Authorization: defaultOption.headers.Authorization },
    data: data,
  });
};



export default apiServices;
export {
  getGetAPI,
  getPostAPI,
  getPutAPI,
  getDeleteAPI,
  apiServices,
  apiDomainURL,
  localDomainURL,
  mqttDomainUrl,
  stripeConnectDomainUrl
};
