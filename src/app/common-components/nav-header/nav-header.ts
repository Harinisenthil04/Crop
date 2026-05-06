import { Component, inject, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../services/auth-service";
import { ROLE_CONFIG, NavLink } from "../../models/nav.model";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "nav-header",
    imports: [RouterLink, CommonModule],
    templateUrl: "./nav-header.html",
    styleUrl: "nav-header.css"
})
export class NavHeader {
    menuLinks: NavLink[] = [];
    private authService = inject(AuthService);

    @Output() viewChange = new EventEmitter<number>();
    activeFlag: number = 0;

    ngOnInit() {
        const loggedInuser = this.authService.loggedInUser();
        if(loggedInuser && loggedInuser.role)
            this.menuLinks = ROLE_CONFIG[loggedInuser.role] || [];
    }

    setView(flag: number) {
        this.activeFlag = flag;
        this.viewChange.emit(flag);
    }
}