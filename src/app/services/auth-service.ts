import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoggedInUser } from '../models/user.model';
import { API_URL, TOKEN_KEY, LOGIN_INFO, USER_PATH } from '../elements/constants';
import { ThemeService } from './theme';
import { ToastService } from './toast-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private http = inject(HttpClient);
	private router = inject(Router);
	private jwtHelper = new JwtHelperService();
	private themeService = inject(ThemeService);
	private toast = inject(ToastService);

	private _loggedInUser = signal<LoggedInUser | null>(null);
	readonly loggedInUser = this._loggedInUser.asReadonly();

	onLogin(credentials: any) {
		return this.http.post<{ token: string }>(`${API_URL}${USER_PATH}/login`, credentials).pipe(
			tap(response => {
				this.saveToken(response.token);
				this.decodeAndStore(response.token);
			})
		);
	}

	onRegister(userData: any) {
		return this.http.post(`${API_URL}${USER_PATH}/register`, userData);
	}

	private saveToken(token: string) {
		localStorage.setItem(TOKEN_KEY, token);
	}

	private decodeAndStore(token: string) {
		const decoded = this.jwtHelper.decodeToken(token);

		const loggedIn: LoggedInUser = {
			email: decoded.sub || decoded.email,
			role: decoded.role
		};

		this._loggedInUser.set(loggedIn);

		localStorage.setItem(LOGIN_INFO, JSON.stringify(loggedIn));
	}

	isLoggedIn(): boolean {
		const token = localStorage.getItem(TOKEN_KEY);
		return token ? !this.jwtHelper.isTokenExpired(token) : false;
	}

	logout(shouldRedirect: boolean = true) {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(LOGIN_INFO);

		this._loggedInUser.set(null);

		if(shouldRedirect)
			this.router.navigate(['/login']);
	}
	
	constructor() {
		const token = localStorage.getItem(TOKEN_KEY);
		const savedUser = localStorage.getItem(LOGIN_INFO);
		if (token && savedUser) {
			if(this.jwtHelper.isTokenExpired(token)) {
				this.toast.show('Session Expired! Login again', 'alert')
				this.logout();
			}
			try {
				this._loggedInUser.set(JSON.parse(savedUser));
				const currentUser = this.loggedInUser();
				if (currentUser) {
					this.themeService.themeChange(currentUser.role);
				}
			} catch (e) {
				this.logout();
			}
		} else {
			this.logout(false);
		}
	}
}