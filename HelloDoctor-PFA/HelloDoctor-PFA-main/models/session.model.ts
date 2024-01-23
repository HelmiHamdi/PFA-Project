import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export class Session {
  sessionId?: number;
  day!: string;
  startTime!: string;
  type!: string;
  doctor!: Doctor;
  patient!: Patient;
  canceled!: boolean;
  canceledDate!: Date;
  selected?:number = 0;
}
