import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((status) => {
        if (!status) {
          this.router.navigateByUrl('login');
        }
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((status) => {
        if (!status) {
          this.router.navigateByUrl('login');
        }
      }),
      take(1)
    );
  }
}
