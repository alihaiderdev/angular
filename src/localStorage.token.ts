import { InjectionToken } from '@angular/core';

export const localStorageToken = new InjectionToken<Storage>('localStorage', {
  providedIn: 'root',
  factory() {
    return localStorage;
  },
});
