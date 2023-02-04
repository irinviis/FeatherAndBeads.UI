import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  verifyUser() {
    const address = this.baseUrl + `userAccount/verifyUser`


    //this.http.post<boolean>(address, user).pipe(
    //  map((verified: boolean) => {
    //    if (!verified) {
    //      this.logout()
    //      window.location.reload();
    //    }
    //  })
    //);


  }

  register(userModel: IUser) {
    return this.http.post<IUser>(this.baseUrl + 'userAccount/register', userModel).pipe(
      map((user: IUser) => {
        if (user) {
            this.setCurrentUser(user);
        }
      })
    )
  }

  login(model: any) {
    return this.http.post<IUser>(this.baseUrl + 'userAccount/login', model).pipe(
      map((response: IUser) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.setCurrentUser(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
  }

  setCurrentUser(user: IUser) {
    this.currentUserSource.next(user);
  }
}
