import { createAPIEndpoint, ENDPOINTS } from "./api.service";
import tokenService from "./token.service";

const authService = {
  login: async (username, password) => {
    const response = await createAPIEndpoint(ENDPOINTS.GETTOKEN).login(
      username,
      password
    );
    if (response.data.access) {
      tokenService.setUser(response.data);
      const nresponse = await createAPIEndpoint(
        ENDPOINTS.GETUSERNAME
      ).getUserName(tokenService.getAccessToken());
      localStorage.setItem("username", nresponse.data.data[0].username);
    }
    return response.data;
  },

  getUserName: () => {
    return localStorage.getItem("username");
  },

  logout: () => {
    tokenService.removeUser();
    localStorage.removeItem("username");
  },

  refreshToken: async () => {
    const refresh = tokenService.getRefreshToken();
    await createAPIEndpoint(ENDPOINTS.REFRESHTOKEN)
      .refreshToken(refresh)
      .then((response) => {
        tokenService.updateAccessToken(response.data.access);
      });
  },

  getAuthToken: () => {
    if (!tokenService.isAccessTokenExpired()) {
      return tokenService.getAccessToken();
    } else if (!tokenService.isRefreshTokenExpired()) {
      return createAPIEndpoint(ENDPOINTS.REFRESHTOKEN).refreshToken(
        tokenService.getRefreshToken()
      );
    }
    return null;
  },
};

export default authService;
