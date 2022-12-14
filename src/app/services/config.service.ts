import { Inject, Injectable } from '@angular/core';
import { RouteConfig } from './routeConfig.interface';
import { RouteConfigToken } from './routeConfig.service';

@Injectable({
  providedIn: 'any',
})
// useful when we want sperate configuration in our any (1 or more than 1) lazy loaded modules
// if we set providedIn to any then whenever a lazy load module is load and any of its component or screen inject this service will craete a new instance at once no matter 1, 2 or 3 screens injecting this service only one instnce will create and all the screens or components in the same module create instnace at once
export class ConfigService {
  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) {
    console.log('ConfigService initialized');
    console.log(this.configToken);
  }
}
