import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AboutCompanyComponent } from './about/about-company/about-company.component';
import { AboutMeComponent } from './about/about-me/about-me.component';
import { AboutComponent } from './about/about.component';
import {
  APP_CONFIG,
  APP_SERVICE_CONFIG,
} from './app-configs/appConfig.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { ContactComponent } from './contact/contact.component';
import { ContainerComponent } from './container/container.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsdToPkrPipe } from './pipes/usd-to-pkr.pipe';
import { AddRoomComponent } from './room/add-room/add-room.component';
import { RoomComponent } from './room/room/room.component';
import { RoomsComponent } from './room/rooms/rooms.component';
import { AppConfigService } from './services/app-config.service';
import { InitService } from './services/init.service';
import { RouteConfigToken } from './services/routeConfig.service';
import { SharedModule } from './shared/shared.module';
import { DepartmentState } from './store/state/department.state';
import { EmployeeState } from './store/state/employee.state';

export function initConfig(appConfigService: AppConfigService) {
  return () => appConfigService.loadConfig();
}

export function initFactory(initService: InitService) {
  return () => initService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    UsdToPkrPipe,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    PageNotFoundComponent,
    AboutCompanyComponent,
    AboutMeComponent,
    HeaderComponent,
    ContainerComponent,
    EmployeeComponent,
    ChildComponent,
    NavbarComponent,
    AddRoomComponent,
    RoomsComponent,
    RoomComponent,
    EmployeeDetailsComponent,
    // HoverDirective,
    // RedElementDirective,
  ],
  imports: [
    NgxsModule.forRoot([EmployeeState, DepartmentState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserModule,
    // if we import or register our modules in this import array then it will automatically load first time along with whole application code load and if you dont want this then dont register it in import array instead register or used in app-routing.module.ts file routes array (lazy loading)
    // AdminModule,
    // UserModule,
    // always register all your feature modules before AppRoutingModule in imports array if they have their own routing file because imports array reading from top to bottom and it go app routing module first and read all their routes and if we access a route that is present in feature module routing file then it will always show 404 page because this route is not present in app routing file so thats why all features module first and then at the end app routing module
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SharedModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    // also see user module
    {
      provide: RouteConfigToken,
      useValue: { title: 'Home' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    // suppose if we register one more interceptor then it will always execute when the first one is completley execute and angular itself add lots of interceptors in it
    {
      provide: APP_INITIALIZER,
      useFactory: initFactory,
      deps: [InitService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    },
    // { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
