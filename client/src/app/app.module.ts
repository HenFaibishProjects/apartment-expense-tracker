import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { FooterModule } from './shared/footer/footer.module';
import { ActivationComponent } from './activation/activation.component';
import { PropertyManagementComponent } from './properties/properties.component';
import { PropertyManagementModule } from './properties/properties.module';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'activate', component: ActivationComponent },
  { path: 'properties', component: PropertyManagementComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActivationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    LoginModule,
    FooterModule,
    PropertyManagementModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
