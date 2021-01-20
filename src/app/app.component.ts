import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ingreso-egreso-app';
  constructor(private authService: AuthService) {
    this.authService.initAuthListener(); // Obtener informacion del usuario en firebase.
  }
}
