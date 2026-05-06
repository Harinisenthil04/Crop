import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../../services/market'; 
import { CropListingDTO } from '../../../models/dto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-officer-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './officer-home.html',
  styleUrl: './officer-home.css'
})
export class OfficerHome implements OnInit {
  // Navigation state matching your user story modules
  activeModule: 'dashboard' | 'crops' | 'documents' | 'subsidies' = 'dashboard';
  
  pendingListings: CropListingDTO[] = [];
  
  // Stats for the "Quick Stats Cards"
  stats = {
    pendingCrops: 12,
    awaitingDocs: 8,
    subsidyApps: 5,
    totalApprovedToday: 15
  };

  constructor(private marketService: MarketService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.marketService.getListingsByStatus('PENDING').subscribe((data: CropListingDTO[]) => {
      this.pendingListings = data;
      this.stats.pendingCrops = data.length;
    });
  }

  setModule(moduleName: any) {
    this.activeModule = moduleName;
  }

  approve(id: number) {
    if(confirm('Confirm approval for this entry?')) {
      this.marketService.validateListing(id).subscribe(() => this.loadData());
    }
  }
}