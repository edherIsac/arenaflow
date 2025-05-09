import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}

  onLogin() {
    // Aquí iría la lógica de autenticación
    // Por ahora solo simulamos un login exitoso
    this.router.navigate(['/tournaments']);
  }
}
