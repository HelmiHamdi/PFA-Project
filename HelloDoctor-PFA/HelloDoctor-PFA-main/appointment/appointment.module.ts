import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPageRoutingModule } from './appointment-routing.module';

import { AppointmentPage } from './appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentPageRoutingModule,
    SuperTabsModule
  ],
  declarations: [AppointmentPage],
  entryComponents: [AppointmentPage],
})
export class AppointmentPageModule {}
