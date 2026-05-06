import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth-service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    const user = authService.loggedInUser();
    const expectedRoles = route.data['roles'] as Array<string>;

    if (user && expectedRoles.includes(user.role.toUpperCase())) {
        return true;
    }
    if (user) {
        router.navigate([`/dashboard/${user.role.toLowerCase()}`]);
    } else {
        router.navigate(['/login']);
    }
    return false;
};