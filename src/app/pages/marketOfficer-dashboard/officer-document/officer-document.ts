// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-officer-document',
//   imports: [],
//   templateUrl: './officer-document.html',
//   styleUrl: './officer-document.css',
// })
// export class OfficerDocument {}


import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../../services/market'; 
import { CropListingDTO } from '../../../models/dto.model';

@Component({
  selector: 'app-officer-documents',
  templateUrl: './officer-document.html',
  styleUrl: './officer-document.css'
})
export class OfficerDocument implements OnInit {
  listingsWithDocs: CropListingDTO[] = [];
  selectedListing: CropListingDTO | null = null;

  constructor(private marketService: MarketService) {}

  ngOnInit(): void {
    this.loadDocs();
  }

  loadDocs(): void {
    // Fetching PENDING listings as they are the ones requiring document audit
    this.marketService.getListingsByStatus('PENDING').subscribe({
      next: (data: CropListingDTO[]) => {
        // Filter to show only those who have actually uploaded something
        this.listingsWithDocs = data.filter((item: CropListingDTO) => !!item.documentUrl);
      },
      error: (err: any) => console.error(err)
    });
  }

  previewDoc(listing: CropListingDTO): void {
    this.selectedListing = listing;
  }

  approve(id: number): void {
    this.marketService.validateListing(id).subscribe({
      next: () => {
        alert('Document Verified & Listing Approved');
        this.selectedListing = null;
        this.loadDocs();
      },
      error: (err: any) => alert(err.message)
    });
  }
}