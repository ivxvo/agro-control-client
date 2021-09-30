class TokenService {
    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return {
            accessToken: user?.accessToken,
            expiryDate: user?.expiryDate
        }
    }

    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    updateLocalTokens(tokens) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = tokens.accessToken;
        user.expiryDate = tokens.expiryDate;
        user.refreshToken = tokens.refreshToken;

        localStorage.setItem("user", JSON.stringify(user));
    }
}

export default new TokenService();