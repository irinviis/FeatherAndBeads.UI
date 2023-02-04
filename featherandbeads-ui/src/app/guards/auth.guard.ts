import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService
  ) { }

  canActivate(): Observable<boolean> {
    this.accountService.verifyUser()

    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    );  
  }
}
