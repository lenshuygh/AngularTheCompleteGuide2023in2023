import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode = false;
  authSubscription: Subscription;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      // ...
    } else {
      this.authSubscription = this.authService
        .signup(email, password)
        .subscribe(
          resData => {
            console.log('resData: ', resData);
            this.isLoading = false;
          },
          error => {
            console.log('error: ', error);
            this.error = 'An error occurred!';
            this.isLoading = false;
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
