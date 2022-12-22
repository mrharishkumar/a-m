import jwt_decode from "jwt-decode";

const tokenService = {
  getUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  removeUser: () => {
    localStorage.removeItem("user");
  },

  getAccessToken: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.access;
  },

  getRefreshToken: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refresh;
  },

  updateAccessToken: (token) => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.access = token;
    localStorage.setItem("user", JSON.stringify(user));
  },

  isAccessTokenExpired: () => {
    const accessToken = JSON.parse(localStorage.getItem("user"))?.access;

    if (accessToken) {
      let { exp } = jwt_decode(accessToken);

      if (Date.now() >= exp * 1000) {
        return true;
      }

      return false;
    }

    return false;
  },

  isRefreshTokenExpired: () => {
    let refreshToken = tokenService.getRefreshToken();

    if (refreshToken) {
      let { exp } = jwt_decode(refreshToken);

      if (Date.now() >= exp * 1000) {
        return true;
      }

      return false;
    }

    return true;
  },
};

export default tokenService;
