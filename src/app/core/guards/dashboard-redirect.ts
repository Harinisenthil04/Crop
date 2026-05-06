import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'app-dashboard-redirect',
    template: '',
    standalone: true
})
export class DashboardRedirectComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);

    ngOnInit() {
        const role = this.authService.loggedInUser()?.role?.toLowerCase();
        
        if (role) {
            this.router.navigate([`/dashboard/${role}`]);
        } else {
            this.router.navigate(['/welcome']);
        }
    }
}