import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorListPageRoutingModule } from './doctor-list-routing.module';
import { DoctorListPage } from './doctor-list.page';
import { DoctorPage } from './doctor/doctor.page';
import { DoctorPageModule } from './doctor/doctor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorListPageRoutingModule,
    DoctorPageModule
  ],
  declarations: [DoctorListPage],
  entryComponents: [DoctorListPage]
})
export class DoctorListPageModule {}
