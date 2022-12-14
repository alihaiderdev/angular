import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConfig } from './appConfig.interface';

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

// export const APP_CONFIG: AppConfig = {
//   baseUrl: environment.baseUrl,
// };

// OR

const { baseUrl } = environment;

export const APP_CONFIG: AppConfig = {
  baseUrl,
};
