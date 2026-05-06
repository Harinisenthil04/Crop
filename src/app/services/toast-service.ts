import { Injectable, signal } from '@angular/core';
export interface ToastData {
    message: string;
    type: 'success' | 'alert' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    private _toast = signal<ToastData | null>(null);
    readonly toast = this._toast.asReadonly();

    show(message: string, type: 'success' | 'alert' | 'info' = 'info') {
        this._toast.set({ message, type });
        setTimeout(() => {
            this.clear();
        }, 3500);
    }

    clear() {
        this._toast.set(null);
    }
}