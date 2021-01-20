import { IncomeOutService } from './../services/income-out.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncomeOut } from '../models/income-out.model';
import Swal from 'sweetalert2';

import * as ui from './../shared/ui.actions';
import { AppState } from './../app.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-income-out',
  templateUrl: './income-out.component.html',
  styles: [],
})
export class IncomeOutComponent implements OnInit, OnDestroy {
  incomeOutForm: FormGroup;
  type: string = 'I';
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private incomeOutService: IncomeOutService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.incomeOutForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
      this.loading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

  onSubmit() {
    if (this.incomeOutForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    const { description, amount } = this.incomeOutForm.value;
    const incomeOut = new IncomeOut(description, amount, this.type);
    this.incomeOutService
      .createIncomeOut(incomeOut)
      .then(() => {
        this.incomeOutForm.reset();
        Swal.fire(
          'Created',
          `${
            this.type === 'I'
              ? 'Income created succesfully!'
              : 'Out created succesfully!'
          }`,
          'success'
        );
        this.store.dispatch(ui.stopLoading());
      })
      .catch((err) => {
        Swal.fire('Error', `${err.message}`, 'error');
        this.store.dispatch(ui.stopLoading());
      });
  }
}
