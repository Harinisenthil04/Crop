import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebNameElement } from "../../elements/web-name";

@Component({
	selector: 'app-footer',
	imports: [RouterLink, WebNameElement],
	templateUrl: './footer.html',
	styleUrl: './footer.css'
})
export class Footer {
	protected readonly title = signal('Agrichain');
}
