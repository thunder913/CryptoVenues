class AuthHelper {
    clearUserSession(navigate: (path: string) => void) {
        this.clearLocalStorage();
        navigate('/signIn');
    }

    setUserSessionAfterSignUp(
        data: { username: string, token: string, tokenExpiry: string },
        navigate: (path: string) => void
    ) {
        this.setLocalStorage(data);
        navigate('/');
    }

    setUserSessionAfterSignIn(
        data: { signIn: { username: string, token: string, tokenExpiry: string } },
        navigate: (path: string) => void
    ) {
        this.setLocalStorage(data.signIn);
        navigate('/');
    }

    private setLocalStorage(data: { username: string, token: string, tokenExpiry: string }) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('jwtTokenExpiry', data.tokenExpiry);
    }

    private clearLocalStorage() {
        localStorage.setItem('username', "");
        localStorage.setItem('jwtToken', "");
        localStorage.setItem('jwtTokenExpiry', "");
    }
}

export default new AuthHelper();
