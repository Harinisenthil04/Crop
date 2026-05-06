import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import { Notification, NotificationDTO } from '../../../models/dto.model';
import { NotificationCategory, UserRole } from '../../../models/enum.model';
import { Loader } from "../../../common-components/loader/loader";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'admin-notifications',
	imports: [FormsModule, CommonModule, Loader, FaIconComponent],
	templateUrl: './admin-notifications.html',
	styleUrl: './admin-notifications.css'
})
export class AdminNotifications implements OnInit {
	notifications = signal<Notification[]>([]);
	loading = signal(false);

	faDelete = faTrash;

	// Form state
	showForm = signal(false);
	notificationForm: NotificationDTO = { subject: '', message: '', category: NotificationCategory.BROADCAST, role: '' };
	roles = Object.values(UserRole);

	constructor(private notificationService: NotificationService) {}

	ngOnInit(): void {
		this.fetchNotifications();
	}

	fetchNotifications() {
		this.loading.set(true);
		this.notificationService.getAllNotifications().subscribe({
			next: (data) => {
				const broadcasts = data.filter(n => n.userId == null);
				this.notifications.set(broadcasts);
				this.loading.set(false);
			},
			error: (err) => {
				console.error('Error fetching notifications', err);
				this.loading.set(false);
			}
		});
	}

	openCreateForm() {
		this.notificationForm = { subject: '', message: '', category: NotificationCategory.BROADCAST, role: '' };
		this.showForm.set(true);
	}

	cancelForm() {
		this.showForm.set(false);
	}

	submitForm() {
		const payload: NotificationDTO = {
			...this.notificationForm,
		};
		if (!payload.role || payload.role === '') {
            delete payload.role;
        }
		this.notificationService.createNotification(payload).subscribe({
			next: () => {
				this.fetchNotifications();
				this.showForm.set(false);
			},
			error: (err) => console.error('Error creating notification', err)
		});
	}

	deleteNotification(id: number) {
		if (confirm('Are you sure you want to delete this broadcast notification?')) {
			this.notificationService.deleteNotification(id).subscribe({
				next: () => this.fetchNotifications(),
				error: (err) => console.error('Error deleting notification', err)
			});
		}
	}
}
