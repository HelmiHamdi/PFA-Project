import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { DoctorPage } from "./doctor.page";
import { CategoryPipeModule } from "src/app/pipes/category.pipe.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPipeModule
  ],
  declarations: [DoctorPage],
  entryComponents: [DoctorPage],
  exports: [DoctorPage]
})
export class DoctorPageModule {}

