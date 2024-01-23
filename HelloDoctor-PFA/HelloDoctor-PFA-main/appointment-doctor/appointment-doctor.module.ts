import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentDoctorPageRoutingModule } from './appointment-doctor-routing.module';

import { AppointmentDoctorPage } from './appointment-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentDoctorPageRoutingModule,
    SuperTabsModule
  ],
  declarations: [AppointmentDoctorPage],
  entryComponents: [AppointmentDoctorPage],
})
export class AppointmentDoctorPageModule {}
