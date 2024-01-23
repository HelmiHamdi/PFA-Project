import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentDoctorPage } from './appointment-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentDoctorPageRoutingModule {}
