import { User } from './../../models/user.model';
import { AppState } from './../../app.reducer';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: User;
  userSubs: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('auth')
      .pipe(filter((user) => user !== null))
      .subscribe(({ user }) => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }

  signOut() {
    this.authService.signOut().then(() => {
      return this.route.navigateByUrl('login');
    });
  }
}
