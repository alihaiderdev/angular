import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  APP_CONFIG,
  APP_SERVICE_CONFIG,
} from './../../app-configs/appConfig.service';
import { AppConfigService } from './../../services/app-config.service';
import { ConfigService } from './../../services/config.service';
import { RouteConfigToken } from './../../services/routeConfig.service';
import { UsersService } from './../../services/users.service';
import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutMeComponent],
      providers: [
        ConfigService,
        UsersService,
        { provide: APP_CONFIG, useValue: AppConfigService },
        {
          provide: APP_SERVICE_CONFIG,
          useValue: { apiEndPoint: 'http://localhost:3000' },
        },
        {
          provide: RouteConfigToken,
          useValue: { title: 'users' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
