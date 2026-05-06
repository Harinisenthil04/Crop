import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [NgClass, FontAwesomeModule],
    templateUrl: './toast.html',
    styleUrls: ['./toast.css']
})
export class ToastComponent {
    protected toastService = inject(ToastService);
    faClose = faClose;
}