import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketService } from '../../services/market'; // Assuming your service path
import { CropListingStatus } from '../../models/enum.model';
import { CropListingDTO } from '../../models/dto.model';
import { WebNameElement } from '../../elements/web-name';
import { Loader } from '../../common-components/loader/loader';

@Component({
  selector: 'app-market-officer',
  standalone: true,
  imports: [CommonModule, WebNameElement, Loader],
  templateUrl: './market-officer.html',
  styleUrl: './market-officer.css',
})
export class MarketOfficer implements OnInit {
  pendingListings: CropListingDTO[] = [];
  validatedListings: CropListingDTO[] = [];
  
  // Metrics for the cards
  metrics = {
    pending: 0,
    totalValidated: 0,
    activeTraders: 12 // Mock data or from a separate service
  };

  constructor(private marketService: MarketService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // Fetch Pending Listings
    this.marketService.getListingsByStatus('PENDING').subscribe(data => {
      this.pendingListings = data;
      this.metrics.pending = data.length;
    });

    // Fetch Validated Listings
    this.marketService.getListingsByStatus('VALIDATED').subscribe(data => {
      this.validatedListings = data;
      this.metrics.totalValidated = data.length;
    });
  }

  onValidate(listingId: number) {
    if(confirm('Are you sure you want to validate this listing?')) {
      this.marketService.validateListing(listingId).subscribe({
        next: (res) => {
          alert('Listing validated successfully!');
          this.loadData(); // Refresh lists
        },
        error: (err) => console.error('Validation failed', err)
      });
    }
  }
}