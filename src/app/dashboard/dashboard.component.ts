import { IncomeOut } from './../models/income-out.model';
import { IncomeOutService } from './../services/income-out.service';
import { AppState } from './../app.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { setItems } from '../income-out/income-out.actions';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  incomeOutSubs: Subscription;
  constructor(
    private store: Store<AppState>,
    private incomeOutService: IncomeOutService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.userSubs = this.store
      .select('auth')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.incomeOutSubs = this.incomeOutService
          .initIncomesOutsListener(user.uid)
          .subscribe((incomesOuts: any) => {
            this.store.dispatch(setItems({ items: incomesOuts }));
            this.spinner.hide();
          });
      });
  }

  ngOnDestroy(): void {
    this.incomeOutSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }
}
