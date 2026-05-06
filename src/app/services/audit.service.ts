import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditDTO, AuditScope, AuditStatus } from '../models/audit.model';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private apiUrl = 'http://localhost:8080/api/audits'; // Update port if needed

  constructor(private http: HttpClient) {}

  createAudit(auditDto: AuditDTO): Observable<AuditDTO> {
    return this.http.post<AuditDTO>(`${this.apiUrl}/create`, auditDto);
  }

  getAllAudits(): Observable<AuditDTO[]> {
    return this.http.get<AuditDTO[]>(`${this.apiUrl}/all`);
  }

  findAuditById(id: number): Observable<AuditDTO> {
    return this.http.get<AuditDTO>(`${this.apiUrl}/${id}`);
  }

  updateAudit(id: number, auditDto: AuditDTO): Observable<AuditDTO> {
    return this.http.put<AuditDTO>(`${this.apiUrl}/${id}`, auditDto);
  }

  deleteAudit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAuditsByOfficer(officerId: number): Observable<AuditDTO[]> {
    return this.http.get<AuditDTO[]>(`${this.apiUrl}/officer/${officerId}`);
  }

  getAuditsByScope(scope: AuditScope): Observable<AuditDTO[]> {
    return this.http.get<AuditDTO[]>(`${this.apiUrl}/scope/${scope}`);
  }

  getAuditsByStatus(status: AuditStatus): Observable<AuditDTO[]> {
    return this.http.get<AuditDTO[]>(`${this.apiUrl}/status/${status}`);
  }
}