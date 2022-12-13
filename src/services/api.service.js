import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const ENDPOINTS = {
  EMPLOYEES: "employees",
  GETTOKEN: "auth/token",
  REFRESHTOKEN: "auth/token/refresh",
  VERIFYTOKEN: "auth/token/verify",
  ASSET: "assets",
  LOGOUT: "auth/logout",
};

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + endpoint + "/";

  return {
    fetchAll: (token) =>
      axios({
        method: "get",
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    fetchById: (id, token) =>
      axios({
        method: "get",
        url: url + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    create: (newRecord, token) =>
      axios({
        method: "post",
        url: url,
        data: newRecord,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((error) => {
        console.log(error);
      }),

    update: (id, updatedRecord, token) =>
      axios({
        method: "put",
        url: url + id,
        data: updatedRecord,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    delete: (id, token) =>
      axios({
        method: "delete",
        url: url + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    login: (username, password) =>
      axios({
        method: "post",
        url: url,
        data: {
          username: username,
          password: password,
        },
      }),

    logout: () =>
      axios({
        method: "post",
        url: url,
      }),

    refreshToken: (refresh) =>
      axios({
        method: "post",
        url: url,
        data: {
          refresh: refresh,
        },
      }),
  };
};
