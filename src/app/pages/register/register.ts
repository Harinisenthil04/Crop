import { Component, signal, inject, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WebNameElement } from "../../elements/web-name";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, WebNameElement],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class RegisterComponent {
    private renderer = inject(Renderer2);

    // Matches the signal pattern used in your LoginPage
    role_selected = signal("FARMER");
    
    // Tracks the actual file objects for the Farmer Registration Form
    selectedFiles: { [key: string]: File } = {};

    onRoleChange(newRole: string) {
        this.role_selected.set(newRole);
        
        // Clean up previous role classes from the body
        const roles = ['farmer', 'trader', 'officer'];
        roles.forEach(role => this.renderer.removeClass(document.body, role));
        
        // Apply new role-based theme
        this.renderer.addClass(document.body, newRole.toLowerCase());
        localStorage.setItem('theme-role', newRole);
    }

    onFileChange(event: any, fieldName: string) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFiles[fieldName] = file;
        }
    }

    onRegisterSubmit(formValue: any) {
        // Collect all data: text fields + selected files
        const registrationData = {
            ...formValue,
            role: this.role_selected(),
            documents: this.selectedFiles
        };
        console.log("Registration Data:", registrationData);
        // Next step: Send this to your Farmer System API
    }

    onClear() {
        this.selectedFiles = {};
    }
}