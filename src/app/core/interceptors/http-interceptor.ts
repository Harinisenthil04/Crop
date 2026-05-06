import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TOKEN_KEY } from '../../elements/constants';
import { ToastService } from '../../services/toast-service';
import { AuthService } from '../../services/auth-service';

// Auth Interceptor: Automatically injects the JWT Bearer token into headers
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedRequest);
    }

    return next(req);
};

// Error Interceptor: Globally catches exceptions and displays your unified Toast notification
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const toast = inject(ToastService);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unexpected error occurred';

            if (error.error instanceof ErrorEvent) {
                errorMessage = `Network Error: ${error.error.message}`;
            } else {
                switch (error.status) {
                    case 401:
                        errorMessage = 'Session expired. Please log in again.';
                        authService.logout();
                        break;
                    case 403:
                        errorMessage = 'Access Denied: You do not have permission to view this section.';
                        break;
                    case 404:
                        errorMessage = 'The requested resource was not found.';
                        break;
                    case 500:
                        errorMessage = 'Internal Server Error. Please try again later.';
                        break;
                    default:
                        errorMessage = error.error?.message || `Error status: ${error.status}`;
                        break;
                }
            }

            toast.show(errorMessage, 'alert');
            return throwError(() => error);
        })
    );
};