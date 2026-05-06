import { Routes, Router } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { WelcomePage } from './pages/welcome/welcome';
import { AdminHome } from "./pages/admin-dashboard/admin-home/admin-home";
import { AdminReports } from './pages/admin-dashboard/admin-reports/admin-reports';
import { TraderPage } from "./pages/trader/trader";
import { PublicLayoutComponent } from './public-layout';
import { AuthLayoutComponent } from './auth-layout';
import { RegisterComponent } from './pages/register/register';
import { authGuard } from './core/guards/auth-guard';
import { MarketOfficer } from './pages/market-officer/market-officer';
import { DashboardRedirectComponent } from './core/guards/dashboard-redirect';
import { inject } from '@angular/core';
import { AuthService } from './services/auth-service';
import { guestGuard } from './core/guards/guest-guard';
import { roleGuard } from './core/guards/role-guard';
import { AdminNotifications } from './pages/admin-dashboard/admin-notifications/admin-notifications';
import { OfficerHome } from './pages/marketOfficer-dashboard/officer-home/officer-home';
import { OfficerInventory } from './pages/marketOfficer-dashboard/officer-inventory/officer-inventory';
import { OfficerHistory } from './pages/marketOfficer-dashboard/officer-history/officer-history';
import { OfficerDocument } from './pages/marketOfficer-dashboard/officer-document/officer-document';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        canActivate: [guestGuard],
        children: [
            { path: 'welcome', component: WelcomePage },
            { path: 'login', component: LoginPage },
            { path: '', pathMatch: 'full', redirectTo: '/welcome' }
        ]
    },
    
    // PROTECTED PAGES
    {
        path: 'dashboard',
        component: AuthLayoutComponent,
        canActivate: [authGuard],
        children: [
            { 
                path: 'admin', 
                canActivate: [roleGuard],
                data: {roles: ['ADMIN']},
                children: [
                    { path: 'home', component: AdminHome },
                    { path: 'reports', component: AdminReports },
                    { path: 'notifications', component: AdminNotifications },
                    { path: '', pathMatch: 'full', redirectTo: 'home'}
                ]
            },
            {
                path: 'farmer', 
                canActivate: [roleGuard],
                data: {roles: ['FARMER']},
                children: [
                    { path: 'register', component: RegisterComponent},
                ]
            },
            { path: 'trader', component: TraderPage },
            
            { path: 'officer', 
                children: [
                    { path: 'home', component: OfficerHome },
                    { path: 'inventory', component: OfficerInventory },
                    { path: 'history', component: OfficerHistory },
                    //{ path: 'documents', component: OfficerDocument },
                    { path: '', pathMatch: 'full', redirectTo: 'home'}
                ]
             },
            { path: '', pathMatch: 'full', component: DashboardRedirectComponent }
        ]
    }
];