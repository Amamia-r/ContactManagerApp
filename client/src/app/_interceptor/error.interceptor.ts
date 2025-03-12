import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modalStateErrors.push(error.error.errors)
                }
              }
              throw modalStateErrors.flat();
            } else {
              toastr.error(error.error, error.status)
            }
            break;
          case 401:
            toastr.error('Unauthorised', error.status)
            break;
          case 404:
            // router.navigateByUrl('error/not-found');
            toastr.error(error.error?.message || 'Not Found', '404 Error');
            break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('error/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something unexpected went wrong')
            break;
        }
      }
      throw error;
    })
  )
};

