import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../services/report.service';
import { Report, ReportDTO } from '../../../models/dto.model';
import { Loader } from "../../../common-components/loader/loader";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
	selector: 'admin-reports',
	imports: [FormsModule, CommonModule, Loader, FaIconComponent],
	templateUrl: './admin-reports.html',
	styleUrl: './admin-reports.css'
})
export class AdminReports implements OnInit {
	reports = signal<Report[]>([]);
	loading = signal(false);

	faEdit = faEdit;
	faDelete = faTrash;

	// Form state
	showForm = signal(false);
	editingId = signal<number | null>(null);
	reportForm: ReportDTO = { scope: '', metrics: '' };

	constructor(private reportService: ReportService) {}

	ngOnInit(): void {
		this.fetchReports();
	}

	fetchReports() {
		this.loading.set(true);
		this.reportService.getAllReports().subscribe({
			next: (data) => {
				this.reports.set(data);
				this.loading.set(false);
			},
			error: (err) => {
				console.error('Error fetching reports', err);
				this.loading.set(false);
			}
		});
	}

	openCreateForm() {
		this.reportForm = { scope: '', metrics: '' };
		this.editingId.set(null);
		this.showForm.set(true);
	}

	openEditForm(report: Report) {
		this.reportForm = { scope: report.scope, metrics: report.metrics };
		this.editingId.set(report.reportId);
		this.showForm.set(true);
	}

	cancelForm() {
		this.showForm.set(false);
	}

	submitForm() {
		if (this.editingId()) {
			this.reportService.updateReport(this.editingId()!, this.reportForm).subscribe({
				next: () => {
					this.fetchReports();
					this.showForm.set(false);
				},
				error: (err) => console.error('Error updating report', err)
			});
		} else {
			this.reportService.generateReport(this.reportForm).subscribe({
				next: () => {
					this.fetchReports();
					this.showForm.set(false);
				},
				error: (err) => console.error('Error creating report', err)
			});
		}
	}

	deleteReport(id: number) {
		if (confirm('Are you sure you want to delete this report?')) {
			this.reportService.deleteReport(id).subscribe({
				next: () => this.fetchReports(),
				error: (err) => console.error('Error deleting report', err)
			});
		}
	}
}
