import { Component } from '@angular/core';
import { IUser } from '../models/user.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FeatherAndBeads';

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const jsonString = localStorage.getItem('user')
    if (jsonString != null) {
      const user: IUser = JSON.parse(jsonString);
      this.accountService.setCurrentUser(user);
    }
  }
}
