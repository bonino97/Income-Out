import Swal from 'sweetalert2';
import { IncomeOutService } from './../../services/income-out.service';
import { IncomeOut } from './../../models/income-out.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateForIncomeOut } from '../income-out.reducer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [],
})
export class DetailsComponent implements OnInit, OnDestroy {
  incomeOuts: IncomeOut[];
  incomeOutSubs: Subscription;

  constructor(
    private store: Store<AppStateForIncomeOut>,
    private incomeOutService: IncomeOutService
  ) {}

  ngOnInit(): void {
    this.incomeOutSubs = this.store
      .select('incomeOut')
      .subscribe(({ items }) => {
        this.incomeOuts = items;
      });
  }

  ngOnDestroy(): void {
    this.incomeOutSubs?.unsubscribe();
  }

  removeItem(item) {
    this.incomeOutService.deleteIncomeOutItem(item.uid).then(
      () => {
        Swal.fire(
          `${item.type === 'I' ? 'Income' : 'Out'} Deleted`,
          '',
          'success'
        );
      },
      (err) => {
        Swal.fire('Error', err.message, 'error');
      }
    );
  }
}
