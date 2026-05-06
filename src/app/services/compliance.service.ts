import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComplianceDTO } from '../models/compliance.model';

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {
  // Ensure this matches your Spring Boot server port
  private apiUrl = 'http://localhost:8080/api/compliances';

  constructor(private http: HttpClient) {}

  /**
   * Links a new compliance record to a specific audit
   * Matches backend: @PostMapping("/create/{auditId}")
   */
  addComplianceToAudit(auditId: number, complianceDto: ComplianceDTO): Observable<ComplianceDTO> {
    return this.http.post<ComplianceDTO>(`${this.apiUrl}/create/${auditId}`, complianceDto);
  }

  /**
   * Fetches all compliance records for the history table
   */
  getAllCompliances(): Observable<ComplianceDTO[]> {
    return this.http.get<ComplianceDTO[]>(`${this.apiUrl}/all`);
  }

  /**
   * Optional: Fetches compliances specifically for one audit
   */
  getCompliancesByAudit(auditId: number): Observable<ComplianceDTO[]> {
    return this.http.get<ComplianceDTO[]>(`${this.apiUrl}/audit/${auditId}`);
  }
}