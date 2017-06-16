export class ShareService {
  username: string;
  is_login: boolean;
  login_type: string;

  constructor() {
    this.username = '';
    this.is_login = false;
  }

  setUsername(username){
    this.username = username;
  }

  setIsLoggedIn(isLoggedIn) {
    this.is_login = isLoggedIn;
  }

  setLoginType(loginType) {
    this.login_type = loginType;
  }

  getUsername() {
    return this.username;
  }

  getIsLoggedIn() {
    return this.is_login;
  }

  getLoginType() {
    return this.login_type;
  }
}
