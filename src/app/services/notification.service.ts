import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification, NotificationDTO } from '../models/dto.model';
import { API_URL, NOTIFICATION_PATH } from '../elements/constants';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	private baseUrl = `${API_URL}${NOTIFICATION_PATH}`;
	constructor(private http: HttpClient) { }

	getAllNotifications(): Observable<Notification[]> {
		return this.http.get<Notification[]>(`${this.baseUrl}/all`);
	}

	getNotificationById(id: number): Observable<Notification> {
		return this.http.get<Notification>(`${this.baseUrl}/${id}`);
	}

	createNotification(notificationDto: NotificationDTO): Observable<Notification> {
		return this.http.post<Notification>(`${this.baseUrl}/create`, notificationDto);
	}

	deleteNotification(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/delete/${id}`);
	}
}
