import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConfigService } from './../services/app-config.service';
import { ConfigService } from './../services/config.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input('onRouteChangeLoader') onRouteChangeLoader!: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appConfigService: AppConfigService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    console.log({ onRouteChangeLoader: this.onRouteChangeLoader });
  }
}
