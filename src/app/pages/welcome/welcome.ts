import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebNameElement } from "../../elements/web-name";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved, faTractor, faThunderstorm } from '@fortawesome/free-solid-svg-icons';


@Component({
	selector: 'app-welcome',
	imports: [RouterLink, WebNameElement, FontAwesomeModule],
	templateUrl: './welcome.html',
	styleUrl: './welcome.css'
})
export class WelcomePage {
	faShield = faShieldHalved;
	faTractor = faTractor;
	faThunderstorm = faThunderstorm;
}