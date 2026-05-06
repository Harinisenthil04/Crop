import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trader',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trader.html',
  styleUrl: './trader.css'
})
export class TraderPage {
  mockUser = {
    email: 'trader.central@agrichain.in',
    role: 'TRADER'
  };

  today = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });

  greeting = computed(() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  });

  // Trader-specific metrics
  stats = signal([
    { label: 'Market Avg (Wheat)', value: '₹2,150/q', icon: '📈', bg: 'rgba(37,99,235,.1)' },
    { label: 'Active Bids', value: 12, icon: '⚖️', bg: 'rgba(245,158,11,.1)' },
    { label: 'Stock in Warehouse', value: '420 MT', icon: '🏭', bg: 'rgba(26,77,46,.1)' },
  ]);

  quick = computed(() => [
    { icon: '🛒', label: 'Browse Marketplace', desc: 'Find live crop listings from farmers', route: '/market' },
    { icon: '📝', label: 'Active Negotiations', desc: 'Check status of your open bids', route: '/bids' },
    { icon: '🚛', label: 'Logistics Tracker', desc: 'Monitor GPS for incoming stock', route: '/logistics' },
    { icon: '📊', label: 'Market Analytics', desc: 'Price trends and demand heatmaps', route: '/analytics' }
  ]);
}