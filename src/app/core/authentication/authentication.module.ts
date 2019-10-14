import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewFarmersComponent } from './view-farmers/view-farmers.component';
import { FarmerTableComponent } from './components/farmer-table/farmer-table.component';
import { OfficerTableComponent } from './components/officer-table/officer-table.component';
import { ViewOfficersComponent } from './view-officers/view-officers.component';
import { OfficerPerformanceTableComponent } from './components/officer-performance-table/officer-performance-table.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    SidebarComponent,
    ViewFarmersComponent,
    FarmerTableComponent,
    OfficerTableComponent,
    ViewOfficersComponent,
    OfficerPerformanceTableComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
