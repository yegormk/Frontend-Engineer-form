import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailAsyncValidatorService {
  emailLibrary = ['test@test.test'];

  isEmailExists(email: string): Observable<boolean> {
    return of(email).pipe(
      map((email) => {
        return this.emailLibrary.includes(email);
      }),
    );
  }

  emailUniqueValidator(): AsyncValidatorFn {
    return (control : AbstractControl): Observable<ValidationErrors | null> => {
      return this.isEmailExists(control.value).pipe(
        map((exists) => {
          if (exists) {
            return { emailExists : true };
          } else {
            this.emailLibrary.push(control.value);
            return null;
          }
        }),
        catchError(async (err) => null),
      );
    };
  }

}
