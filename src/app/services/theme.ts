import { Injectable, signal, inject, RendererFactory2, Renderer2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private renderer: Renderer2;
    private _role_selected = signal(localStorage.getItem('theme-role') || "FARMER");
    role_selected = this._role_selected.asReadonly();

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    themeRole() {
        return this.role_selected();
    }
    themeChange(newRole: string) {
        if(["OFFICER", "MANAGER", "COMPLIANCE", "AUDITOR"].includes(newRole)) {
            this._role_selected.set("OFFICER");
            newRole = "OFFICER";
        } else {
            this._role_selected.set(newRole);
        }
		
		const roles = ['FARMER', 'TRADER', 'OFFICER', 'ADMIN'];
        roles.forEach(role => {
            this.renderer.removeClass(document.body, role.toLowerCase());
        });

        this.renderer.addClass(document.body, newRole.toLowerCase());
		localStorage.setItem('theme-role', newRole);
	}
}