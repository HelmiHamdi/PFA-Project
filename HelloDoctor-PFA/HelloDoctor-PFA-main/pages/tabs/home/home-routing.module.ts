import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }/*,
  {
    path: 'home/doctors',
    loadChildren: () => import('./doctor-list/doctor-list.module').then( m => m.DoctorListPageModule)
  }*/,
  {
    path: 'new-appointment',
    loadChildren: () => import('../../../appointment-doctor/appointment-doctor.module').then( m => m.AppointmentDoctorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
