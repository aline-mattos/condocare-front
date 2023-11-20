import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './componentes/login/login.component'
import { RegisterComponent } from './componentes/register/register.component'
import { HomeComponent } from './componentes/home/home.component'
import { HomeAuthComponent } from './componentes/home-auth/home-auth.component'
import { HomeAdminComponent } from './componentes/home-admin/home-admin.component'
import { AuthGuard } from '../app/services/auth.guard'


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home-auth',
    component: HomeAuthComponent, //canActivate: [AuthGuard]
  },
  {
    path: 'home-admin',
    component: HomeAdminComponent, //canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
