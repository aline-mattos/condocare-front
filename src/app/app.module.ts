import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './componentes/home/home.component'
import { LoginComponent } from './componentes/login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './componentes/register/register.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavbarComponent } from './componentes/navbar/navbar.component'
import { HomeAuthComponent } from './componentes/home-auth/home-auth.component'
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeAuthComponent,
    HomeAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbDatepickerModule,
    NgbModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
