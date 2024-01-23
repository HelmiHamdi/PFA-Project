import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export class Rating {
  ratingId!: number;
  patient!: Patient;
  doctor!: Doctor;
  rating!: number;
  date!: Date;
}
