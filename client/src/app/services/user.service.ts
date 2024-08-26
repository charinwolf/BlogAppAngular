import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userInfo: any = {};

  getUserInfo() {
    return this.userInfo
  }
  
  setUserInfo(info: any){
    this.userInfo = info
  }
}
