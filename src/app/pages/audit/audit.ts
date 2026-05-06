import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditService } from '../../services/audit.service';
import { AuditDTO, AuditScope, AuditStatus } from '../../models/audit.model';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit.html',
  styleUrls: ['./audit.css'] // Ensure this file exists or remove this line
})
export class AuditComponent implements OnInit {
  
  // 1. Define the list to hold records
  audits: AuditDTO[] = [];

  // 2. Initialize the form object with default values
  newAudit: AuditDTO = {
    officerId: 101,
    scope: AuditScope.PROGRAM,
    status: AuditStatus.OPEN,
    findings: '',
    date: new Date().toISOString().split('T')[0]
  };

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    this.loadAudits();
  }

  // 3. Load all audits from the backend
  loadAudits(): void {
    this.auditService.getAllAudits().subscribe({
      next: (data) => {
        this.audits = data;
      },
      error: (err) => {
        console.error('Error fetching audits:', err);
      }
    });
  }

  // 4. THE MISSING METHOD: This fixes your error
  submitAudit(): void {
    this.auditService.createAudit(this.newAudit).subscribe({
      next: (response) => {
        console.log('Audit created successfully:', response);
        this.loadAudits(); // Refresh the table
        this.resetForm();  // Clear the form
      },
      error: (err) => {
        console.error('Error creating audit:', err);
        alert('Could not save audit. Is the backend running?');
      }
    });
  }

  resetForm(): void {
    this.newAudit = {
      officerId: 101,
      scope: AuditScope.PROGRAM,
      status: AuditStatus.OPEN,
      findings: '',
      date: new Date().toISOString().split('T')[0]
    };
  }
}