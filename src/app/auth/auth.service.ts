import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signup(email: string, password: string) {
    const apiKey = environment.firebaseApiKey;
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
    return this.httpClient
      .post<AuthResponseData>(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(errorResponse => {
          let errorMessage = 'An unknown error occurred';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email address is registered already';
          }
          return throwError(errorMessage);
        })
      );
  }
}
