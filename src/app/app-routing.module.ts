import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/core/authentication/login/login.component';
import { HomeComponent } from 'src/app/core/authentication/home/home.component';
import { RegisterComponent } from 'src/app/core/authentication/register/register.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ViewOfficersComponent } from 'src/app/core/authentication/view-officers/view-officers.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], },
  { path: 'view-officers', component: ViewOfficersComponent, canActivate: [AuthGuard], },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
