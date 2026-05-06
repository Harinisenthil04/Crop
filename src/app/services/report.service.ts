import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report, ReportDTO } from '../models/dto.model';
import { API_URL, REPORT_PATH } from '../elements/constants';

@Injectable({
	providedIn: 'root'
})
export class ReportService {
	private http = inject(HttpClient);
	private baseUrl = `${API_URL}${REPORT_PATH}`;

	getAllReports(): Observable<Report[]> {
		return this.http.get<Report[]>(`${this.baseUrl}/all`);
	}

	getReportById(id: number): Observable<Report> {
		return this.http.get<Report>(`${this.baseUrl}/${id}`);
	}

	generateReport(reportDto: ReportDTO): Observable<Report> {
		return this.http.post<Report>(`${this.baseUrl}/generate`, reportDto);
	}

	updateReport(id: number, reportDto: ReportDTO): Observable<Report> {
		return this.http.put<Report>(`${this.baseUrl}/update/${id}`, reportDto);
	}

	deleteReport(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
	}
}