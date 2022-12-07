import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {
  user!: IUser;

  constructor(
    public accountService: AccountService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(usr =>
      this.user = usr);
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userIdString = this.route.snapshot.paramMap.get('id');

    if (userIdString) {
      const userId = Number(userIdString);

      this.userService.getUser(userId).subscribe(usr => {
        this.user = usr;
      })
    }
  }
}
