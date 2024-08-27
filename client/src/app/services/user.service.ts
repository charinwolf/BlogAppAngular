import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userInfoSubject = new BehaviorSubject<any>(null);
  
  setUserInfo(info: any){
    this.userInfoSubject.next(info)
  }

  getUserInfo() {
    return this.userInfoSubject.asObservable();
  }
  
}
