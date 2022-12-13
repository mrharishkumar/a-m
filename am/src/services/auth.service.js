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
    }
    return response.data;
  },

  logout: () => {
    tokenService.removeUser();
  },

  refreshToken: async () => {
    const refresh = tokenService.getRefreshToken();
    await createAPIEndpoint(ENDPOINTS.REFRESHTOKEN)
      .refreshToken(refresh)
      .then((response) => {
        console.log(response.data);
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
