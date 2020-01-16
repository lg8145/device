export const UserInfo = {
  getUserInfo() {
      let storge = localStorage.getItem('userInfo') || '';
      storge = JSON.parse(storge);
      return storge
  },

  getCookie(name) {
      var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
      if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
      } else { 
          return null;
      }
  },

  setCookie(cname, cvalue, exdays = 1) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `${cname}=${cvalue};${expires};path=/`;
  },

  delCookie(name){
      if (name) {
          this.setCookie(name, '', -1);
      } else {
          this.setCookie('tokenId', '', -1);
          this.setCookie('JSESSIONID', '', -1);
          localStorage.clear()
      }
  }

}
