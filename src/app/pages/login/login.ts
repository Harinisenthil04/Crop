import { Component, signal, inject, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WebNameElement } from "../../elements/web-name";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { ThemeService } from '../../services/theme';
import { LOGIN_INFO } from '../../elements/constants';
import { LoggedInUser } from '../../models/user.model';
import { ToastService } from '../../services/toast-service';

@Component({
	selector: 'app-login',
	imports: [RouterLink, WebNameElement, FormsModule],
	templateUrl: './login.html',
	styleUrl: './login.css'
})
export class LoginPage {
	private router = inject(Router);
	private authService = inject(AuthService);
	private toast = inject(ToastService);
	themeService = inject(ThemeService);

	account_method = signal("login");
	constructor() {
		this.themeService.themeChange("FARMER");
	}
	role_selected = computed(() => this.themeService.themeRole());

	formData = {
		name: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: ''
	};

	onSubmit() {
		const payload = {
			...this.formData,
			role: this.themeService.role_selected()
		};

		if (this.account_method() === 'login') {
			if(payload.email === "") {
				this.toast.show('Please enter Email', 'alert');
				return;
			} else if(payload.password === "") {
				this.toast.show('Please enter password', 'alert');
				return;
			}

			this.authService.onLogin({
				email: payload.email,
				password: payload.password
			}).subscribe({
				next: () => {
					const loggedUser = this.authService.loggedInUser();
					if(loggedUser) {
						this.themeService.themeChange(loggedUser.role);
					}
					this.router.navigate([`/dashboard/${loggedUser?.role.toLocaleLowerCase()}`]);
				},
				error: (err) => {
					console.error("Login failed", err);
					if (err.status === 409) {
						this.toast.show('Incorrect password. Please try again.', 'alert');
					} else if (err.status === 404) {
						this.toast.show('User account not found', 'alert');
					} else {
						this.toast.show('An unexpected error occurred. Please try again later.', 'alert');
					}
				}
			});
		} else {
			if (this.formData.password !== this.formData.confirmPassword) {
				this.toast.show('Passwords do not match!', 'alert');
				return;
			}
			this.authService.onRegister(payload).subscribe({
				next: () => {
					this.toast.show('Registration successful! Please login.', 'success');
					this.onAccountMethodChange('login');
				},
				error: (err) => console.error("Signup failed", err)
			});
		}
	}

	onAccountMethodChange(newMethod: string) {
		this.account_method.set(newMethod);
		this.onRoleChange("FARMER");
	}

	onRoleChange(newRole: string) {
		this.themeService.themeChange(newRole);
	}
}