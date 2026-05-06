import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketOfficer } from './pages/market-officer/market-officer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MarketOfficer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Agrichain');
}
