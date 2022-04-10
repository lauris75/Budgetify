import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'budgetify';

  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  healthCheck() {
    this.authService.healthCheck().subscribe((data) => console.log(data));
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
