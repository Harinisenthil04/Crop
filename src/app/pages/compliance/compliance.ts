import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplianceService } from '../../services/compliance.service';
import { ComplianceDTO, ComplianceType, ComplianceResult } from '../../models/compliance.model';

@Component({
  selector: 'app-compliance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compliance.html',
  styleUrl: './compliance.css'
})
export class ComplianceComponent implements OnInit {
  compliances: ComplianceDTO[] = [];

  newCompliance: ComplianceDTO = {
    auditId: 0,
    entityId: 0,
    type: ComplianceType.PROGRAM,
    result: ComplianceResult.PENDING,
    notes: '',
    date: new Date().toISOString().split('T')[0]
  };

  constructor(private complianceService: ComplianceService) {}

  ngOnInit(): void {
    this.loadCompliances();
  }

  loadCompliances(): void {
    this.complianceService.getAllCompliances().subscribe({
      next: (data) => this.compliances = data,
      error: (err) => console.error('Error fetching data', err)
    });
  }

  submitCompliance(): void {
    // Note: Passes auditId separately as per your backend controller requirement
    this.complianceService.addComplianceToAudit(this.newCompliance.auditId, this.newCompliance).subscribe({
      next: (res) => {
        this.loadCompliances();
        this.resetForm();
      },
      error: (err) => alert('Failed to save compliance record.')
    });
  }

  resetForm(): void {
    this.newCompliance = {
      auditId: 0,
      entityId: 0,
      type: ComplianceType.PROGRAM,
      result: ComplianceResult.PENDING,
      notes: '',
      date: new Date().toISOString().split('T')[0]
    };
  }
}