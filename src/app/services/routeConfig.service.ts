import { InjectionToken } from '@angular/core';
import { RouteConfig } from './routeConfig.interface';

export const RouteConfigToken = new InjectionToken<RouteConfig>('routeConfig');
