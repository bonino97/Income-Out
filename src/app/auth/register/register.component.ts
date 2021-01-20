import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as ui from './../../shared/ui.actions';
import { AppState } from './../../app.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
      this.loading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Wait a minute...',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    this.authService
      .createUser(this.registerForm.value)
      .then((credentials) => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigateByUrl('');
        // Swal.close();
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
