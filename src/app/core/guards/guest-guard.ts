import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth-service';

export const guestGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const role = authService.loggedInUser()?.role?.toLowerCase();

    if (authService.isLoggedIn()) {
        const targetPath = `/dashboard/${role}`;
        router.navigate([targetPath]);
        return false;
    }

    return true;
};