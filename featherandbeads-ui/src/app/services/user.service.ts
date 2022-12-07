import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getUser(userId: number) {
    return this.http.get<IUser>(this.baseUrl + 'userAccount' + userId);
  }
}
